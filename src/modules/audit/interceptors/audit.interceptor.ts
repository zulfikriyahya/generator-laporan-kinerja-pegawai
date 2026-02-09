import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../audit.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private auditService: AuditService,
    private reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user, method, url, body, ip, headers } = request;

    // Skip audit for GET requests by default
    if (method === 'GET') {
      return next.handle();
    }

    // Get handler and class
    const handler = context.getHandler();
    const controller = context.getClass();

    // Determine action
    const action = this.getAction(method, handler.name);

    // Determine entity from URL
    const entity = this.getEntityFromUrl(url);

    // Get entity ID if present
    const entityId = request.params?.id;

    // Execute the request
    return next.handle().pipe(
      tap(async (response) => {
        // Only log if user is authenticated
        if (user && user.id) {
          try {
            await this.auditService.log({
              userId: user.id,
              action,
              entity,
              entityId,
              newData: method !== 'DELETE' ? this.sanitizeData(body) : undefined,
              ipAddress: ip,
              userAgent: headers['user-agent'],
            });
          } catch (error) {
            // Silently fail - don't break the main request
            console.error('Audit logging failed:', error);
          }
        }
      }),
    );
  }

  private getAction(method: string, handlerName: string): string {
    const methodMap: Record<string, string> = {
      POST: 'CREATE',
      PUT: 'UPDATE',
      PATCH: 'UPDATE',
      DELETE: 'DELETE',
    };

    // Try to get more specific action from handler name
    if (handlerName.includes('approve')) return 'APPROVE';
    if (handlerName.includes('reject')) return 'REJECT';
    if (handlerName.includes('submit')) return 'SUBMIT';
    if (handlerName.includes('export')) return 'EXPORT';
    if (handlerName.includes('generate')) return 'GENERATE';

    return methodMap[method] || 'ACTION';
  }

  private getEntityFromUrl(url: string): string {
    // Extract entity from URL path
    // Example: /api/reports/123 -> REPORT
    const parts = url.split('/').filter(Boolean);

    if (parts.length >= 2) {
      // Remove 'api' if present
      const entityPart = parts[0] === 'api' ? parts[1] : parts[0];
      return entityPart.toUpperCase().slice(0, -1); // Remove trailing 's'
    }

    return 'UNKNOWN';
  }

  private sanitizeData(data: any): any {
    if (!data) return undefined;

    // Remove sensitive fields
    const sensitiveFields = ['password', 'refreshToken', 'token', 'secret'];
    const sanitized = { ...data };

    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}

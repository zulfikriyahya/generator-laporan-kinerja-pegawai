import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);
  private userSockets = new Map<string, string[]>(); // userId -> socketIds[]

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // Extract token from handshake
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        this.logger.warn(`Connection rejected: No token provided`);
        client.disconnect();
        return;
      }

      // Verify JWT token
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;

      // Store socket connection
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, []);
      }
      this.userSockets.get(userId)!.push(client.id);

      // Store userId in socket data
      client.data.userId = userId;

      this.logger.log(`Client connected: ${client.id} (User: ${userId})`);
      this.logger.log(
        `Total connections for user ${userId}: ${this.userSockets.get(userId)?.length}`,
      );

      // Send connection success
      client.emit('connected', {
        message: 'Successfully connected to notifications',
        userId,
      });
    } catch (error) {
      this.logger.error(`Connection error: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;

    if (userId && this.userSockets.has(userId)) {
      const sockets = this.userSockets.get(userId)!;
      const index = sockets.indexOf(client.id);
      if (index > -1) {
        sockets.splice(index, 1);
      }

      if (sockets.length === 0) {
        this.userSockets.delete(userId);
      }

      this.logger.log(`Client disconnected: ${client.id} (User: ${userId})`);
    }
  }

  /**
   * Send notification to specific user
   */
  sendToUser(userId: string, notification: any) {
    const socketIds = this.userSockets.get(userId);

    if (socketIds && socketIds.length > 0) {
      socketIds.forEach((socketId) => {
        this.server.to(socketId).emit('notification', notification);
      });

      this.logger.log(`Notification sent to user ${userId} (${socketIds.length} connections)`);
    } else {
      this.logger.log(`No active connections for user ${userId}`);
    }
  }

  /**
   * Broadcast to all connected users
   */
  broadcast(event: string, data: any) {
    this.server.emit(event, data);
    this.logger.log(`Broadcast event: ${event}`);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket): void {
    client.emit('pong', { timestamp: new Date().toISOString() });
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channel: string },
  ): void {
    client.join(data.channel);
    this.logger.log(`Client ${client.id} subscribed to ${data.channel}`);
    client.emit('subscribed', { channel: data.channel });
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { channel: string },
  ): void {
    client.leave(data.channel);
    this.logger.log(`Client ${client.id} unsubscribed from ${data.channel}`);
    client.emit('unsubscribed', { channel: data.channel });
  }
}

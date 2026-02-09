# Project Files

.
├── API_DOCUMENTATION.md
├── create_project.sh
├── draft-frontend.md
├── draft.md
├── FILE_INDEX.md
├── generate.sh
├── IMPLEMENTATION_SUMMARY.md
├── nest-cli.json
├── package.json
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── PROJECT_STRUCTURE.md
├── PROMPT.md
├── QUICK_SETUP.md
├── QUICK_START.md
├── README.md
├── SETUP_GUIDE.md
├── src
│   ├── app.module.ts
│   ├── common
│   │   ├── decorators
│   │   ├── filters
│   │   ├── guards
│   │   ├── interceptors
│   │   └── prisma
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── config
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── redis.config.ts
│   ├── main.ts
│   ├── modules
│   │   ├── ai
│   │   │   ├── ai.controller.ts
│   │   │   ├── ai.module.ts
│   │   │   ├── ai.service.ts
│   │   │   ├── dto
│   │   │   │   └── generate-report.dto.ts
│   │   │   ├── interfaces
│   │   │   │   └── ai-provider.interface.ts
│   │   │   └── providers
│   │   │       ├── claude.provider.ts
│   │   │       ├── deepseek.provider.ts
│   │   │       ├── gemini.provider.ts
│   │   │       ├── groq.provider.ts
│   │   │       ├── openai.provider.ts
│   │   │       └── together.provider.ts
│   │   ├── audit
│   │   │   ├── audit.controller.ts
│   │   │   ├── audit.module.ts
│   │   │   ├── audit.service.ts
│   │   │   └── interceptors
│   │   │       └── audit.interceptor.ts
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── decorators
│   │   │   │   └── index.ts
│   │   │   ├── dto
│   │   │   │   └── index.ts
│   │   │   ├── guards
│   │   │   │   └── index.ts
│   │   │   ├── interfaces
│   │   │   │   └── index.ts
│   │   │   └── strategies
│   │   │       ├── jwt-refresh.strategy.ts
│   │   │       ├── jwt.strategy.ts
│   │   │       └── local.strategy.ts
│   │   ├── files
│   │   │   ├── dto
│   │   │   ├── files.controller.ts
│   │   │   ├── files.module.ts
│   │   │   └── files.service.ts
│   │   ├── health
│   │   │   ├── health.controller.ts
│   │   │   └── health.module.ts
│   │   ├── instansi
│   │   │   ├── dto
│   │   │   │   ├── create-instansi.dto.ts
│   │   │   │   └── update-instansi.dto.ts
│   │   │   ├── instansi.controller.ts
│   │   │   ├── instansi.module.ts
│   │   │   └── instansi.service.ts
│   │   ├── notifications
│   │   │   ├── dto
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.gateway.ts
│   │   │   ├── notifications.module.ts
│   │   │   └── notifications.service.ts
│   │   ├── pegawai
│   │   │   ├── dto
│   │   │   │   ├── create-pegawai.dto.ts
│   │   │   │   └── update-pegawai.dto.ts
│   │   │   ├── entities
│   │   │   ├── pegawai.controller.ts
│   │   │   ├── pegawai.module.ts
│   │   │   └── pegawai.service.ts
│   │   ├── reports
│   │   │   ├── dto
│   │   │   │   ├── create-report.dto.ts
│   │   │   │   ├── generate-report.dto.ts
│   │   │   │   └── update-report.dto.ts
│   │   │   ├── processors
│   │   │   │   └── report.processor.ts
│   │   │   ├── queues
│   │   │   │   └── report.queue.ts
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.module.ts
│   │   │   ├── reports.service.spec.ts
│   │   │   ├── reports.service.ts
│   │   │   └── services
│   │   │       ├── docx-export.service.ts
│   │   │       └── pdf-export.service.ts
│   │   └── users
│   │       ├── dto
│   │       ├── entities
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.service.ts
│   └── utils
│       ├── constants.ts
│       ├── helpers.ts
│       └── validators.ts
├── tsconfig.json
└── yarn.lock

43 directories, 87 files

# File Contents

## package.json

```json
{
  "name": "ekinerja-backend-api",
  "version": "1.0.0",
  "description": "Backend API untuk Generator Laporan Kinerja Pegawai",
  "author": "Yahya Zulfikri",
  "license": "MIT",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "prisma:seed": "ts-node prisma/seed.ts"
  },
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@nestjs/axios": "^4.0.1",
    "@nestjs/bullmq": "^10.0.1",
    "@nestjs/common": "^10.3.0",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.3.0",
    "@nestjs/jwt": "^10.2.0",
    "@nestjs/passport": "^10.0.3",
    "@nestjs/platform-express": "^10.3.0",
    "@nestjs/platform-socket.io": "^10.3.0",
    "@nestjs/swagger": "^7.1.17",
    "@nestjs/terminus": "^11.0.0",
    "@nestjs/throttler": "^6.5.0",
    "@nestjs/websockets": "^10.3.0",
    "@prisma/client": "^5.8.0",
    "@sentry/node": "^7.93.0",
    "@sentry/profiling-node": "^7.93.0",
    "axios": "^1.6.5",
    "bcrypt": "^5.1.1",
    "bullmq": "^5.1.5",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "cors": "^2.8.5",
    "date-fns": "^3.0.6",
    "docx": "^9.5.1",
    "helmet": "^7.1.0",
    "marked": "^17.0.1",
    "multer": "^1.4.5-lts.1",
    "nest-winston": "^1.9.4",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "pdfkit": "^0.17.2",
    "redis": "^4.6.12",
    "reflect-metadata": "^0.2.1",
    "rxjs": "^7.8.1",
    "socket.io": "^4.6.1",
    "winston": "^3.11.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.2.1",
    "@nestjs/schematics": "^10.0.3",
    "@nestjs/testing": "^10.3.0",
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/jest": "^30.0.0",
    "@types/marked": "^6.0.0",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.10.6",
    "@types/passport-jwt": "^4.0.0",
    "@types/passport-local": "^1.0.38",
    "@types/pdfkit": "^0.17.4",
    "@types/supertest": "^6.0.3",
    "@typescript-eslint/eslint-plugin": "^6.16.0",
    "@typescript-eslint/parser": "^6.16.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.2",
    "jest": "^29.7.0",
    "jest-mock-extended": "^4.0.0",
    "prettier": "^3.1.1",
    "prisma": "^5.8.0",
    "supertest": "^7.2.2",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/$1"
    }
  }
}
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "paths": {
      "@/*": ["src/*"],
      "@config/*": ["src/config/*"],
      "@modules/*": ["src/modules/*"],
      "@common/*": ["src/common/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

---

## src/modules/instansi/instansi.service.ts

```typescript
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateInstansiDto } from './dto/create-instansi.dto';
import { UpdateInstansiDto } from './dto/update-instansi.dto';

@Injectable()
export class InstansiService {
  private readonly logger = new Logger(InstansiService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Create new instansi
   */
  async create(createInstansiDto: CreateInstansiDto) {
    this.logger.log('Creating new instansi');

    const instansi = await this.prisma.instansi.create({
      data: createInstansiDto,
    });

    this.logger.log(`Instansi created: ${instansi.id}`);
    return instansi;
  }

  /**
   * Get all instansi
   */
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.instansi.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.instansi.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get active instansi
   */
  async findActive() {
    return this.prisma.instansi.findFirst({
      where: { isActive: true },
    });
  }

  /**
   * Get instansi by id
   */
  async findOne(id: string) {
    const instansi = await this.prisma.instansi.findUnique({
      where: { id },
      include: {
        reports: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!instansi) {
      throw new NotFoundException(`Instansi dengan ID ${id} tidak ditemukan`);
    }

    return instansi;
  }

  /**
   * Update instansi
   */
  async update(id: string, updateInstansiDto: UpdateInstansiDto) {
    const exists = await this.prisma.instansi.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Instansi dengan ID ${id} tidak ditemukan`);
    }

    const updated = await this.prisma.instansi.update({
      where: { id },
      data: updateInstansiDto,
    });

    this.logger.log(`Instansi updated: ${id}`);
    return updated;
  }

  /**
   * Set as active instansi
   */
  async setActive(id: string) {
    // Deactivate all other instansi
    await this.prisma.instansi.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Activate selected instansi
    const updated = await this.prisma.instansi.update({
      where: { id },
      data: { isActive: true },
    });

    this.logger.log(`Instansi set as active: ${id}`);
    return updated;
  }

  /**
   * Delete instansi
   */
  async remove(id: string) {
    const exists = await this.prisma.instansi.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Instansi dengan ID ${id} tidak ditemukan`);
    }

    await this.prisma.instansi.delete({
      where: { id },
    });

    this.logger.log(`Instansi deleted: ${id}`);
    return { message: 'Instansi berhasil dihapus' };
  }
}
```

---

## src/modules/instansi/instansi.module.ts

```typescript
import { Module } from '@nestjs/common';
import { InstansiService } from './instansi.service';
import { InstansiController } from './instansi.controller';

@Module({
  controllers: [InstansiController],
  providers: [InstansiService],
  exports: [InstansiService],
})
export class InstansiModule {}
```

---

## src/modules/instansi/dto/update-instansi.dto.ts

```typescript
import { PartialType } from '@nestjs/swagger';
import { CreateInstansiDto } from './create-instansi.dto';

export class UpdateInstansiDto extends PartialType(CreateInstansiDto) {}
```

---

## src/modules/instansi/dto/create-instansi.dto.ts

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateInstansiDto {
  @ApiProperty({
    example: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
    description: 'Header line 1 for document kop',
  })
  @IsString()
  header1: string;

  @ApiProperty({
    example: 'KANTOR KABUPATEN PANDEGLANG',
    description: 'Header line 2 for document kop',
  })
  @IsString()
  header2: string;

  @ApiProperty({
    example: 'MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG',
    description: 'Header line 3 (Main Agency Name)',
  })
  @IsString()
  header3: string;

  @ApiProperty({
    example: 'Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253',
    description: 'Full address of the agency',
  })
  @IsString()
  alamat: string;

  @ApiProperty({
    example: '(0253) 201000',
    description: 'Phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  telepon?: string;

  @ApiProperty({
    example: 'mtsn1pandeglang@kemenag.go.id',
    description: 'Official email address',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'https://mtsn1pandeglang.sch.id',
    description: 'Official website URL',
    required: false,
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({
    example: 'base64_encoded_image_string...',
    description: 'Primary logo (e.g., Kemenag logo)',
    required: false,
  })
  @IsOptional()
  @IsString()
  logoUtama?: string;

  @ApiProperty({
    example: 'base64_encoded_image_string...',
    description: 'Secondary logo (Agency specific)',
    required: false,
  })
  @IsOptional()
  @IsString()
  logoInstansi?: string;

  @ApiProperty({
    example: 'Dr. H. Fulan bin Fulan, M.Pd',
    description: 'Name of the Head of Agency',
  })
  @IsString()
  namaKepala: string;

  @ApiProperty({
    example: '196501011990031001',
    description: 'NIP of the Head of Agency',
  })
  @IsString()
  nipKepala: string;

  @ApiProperty({
    example: 'Pembina/IV-a',
    description: 'Rank/Golongan of the Head of Agency',
  })
  @IsString()
  pangkatKepala: string;

  @ApiProperty({
    example: 'base64_encoded_signature...',
    description: 'Digital signature of the Head of Agency',
    required: false,
  })
  @IsOptional()
  @IsString()
  ttdKepala?: string;

  @ApiProperty({
    example: 'Pandeglang',
    description: 'City name for date signature (Titimangsa)',
  })
  @IsString()
  titimangsa: string;

  @ApiProperty({
    example: true,
    description: 'Set as active agency immediately',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
```

---

## src/modules/instansi/instansi.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { InstansiService } from './instansi.service';
import { CreateInstansiDto } from './dto/create-instansi.dto';
import { UpdateInstansiDto } from './dto/update-instansi.dto';
import { JwtAuthGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';

@ApiTags('instansi')
@Controller('instansi')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InstansiController {
  constructor(private readonly instansiService: InstansiService) {}

  @Post()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Create new instansi' })
  @ApiResponse({ status: 201, description: 'Instansi created successfully' })
  create(@Body() createInstansiDto: CreateInstansiDto) {
    return this.instansiService.create(createInstansiDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all instansi' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.instansiService.findAll(parseInt(page || '1'), parseInt(limit || '10'));
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active instansi' })
  findActive() {
    return this.instansiService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get instansi by ID' })
  findOne(@Param('id') id: string) {
    return this.instansiService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Update instansi' })
  update(@Param('id') id: string, @Body() updateInstansiDto: UpdateInstansiDto) {
    return this.instansiService.update(id, updateInstansiDto);
  }

  @Patch(':id/set-active')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Set instansi as active' })
  setActive(@Param('id') id: string) {
    return this.instansiService.setActive(id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete instansi' })
  remove(@Param('id') id: string) {
    return this.instansiService.remove(id);
  }
}
```

---

## src/modules/auth/decorators/index.ts

```typescript
import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (data) {
    return request.user[data];
  }
  return request.user;
});

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

---

## src/modules/auth/auth.service.ts

```typescript
import { Injectable, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/common/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtPayload, AuthResponse } from './interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          role: (dto.role as any) || 'USER',
        },
      });

      const tokens = await this.generateTokens(user.id, user.email, user.role);
      const hashedRefreshToken = await this.hashPassword(tokens.refreshToken);

      await tx.user.update({
        where: { id: user.id },
        data: { refreshToken: hashedRefreshToken },
      });

      this.logger.log(`User registered successfully via transaction: ${user.email}`);

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        ...tokens,
      };
    });
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const hashedRefreshToken = await this.hashPassword(tokens.refreshToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
        lastLogin: new Date(),
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    const hashedRefreshToken = await this.hashPassword(tokens.refreshToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      ...tokens,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  private async generateTokens(
    userId: string,
    email: string,
    role: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: this.config.get('JWT_EXPIRES_IN') || '7d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') || '30d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
```

---

## src/modules/auth/guards/index.ts

```typescript
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

---

## src/modules/auth/strategies/jwt-refresh.strategy.ts

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
```

---

## src/modules/auth/strategies/jwt.strategy.ts

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/common/prisma/prisma.service';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }
}
```

---

## src/modules/auth/strategies/local.strategy.ts

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
```

---

## src/modules/auth/dto/index.ts

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'ahmad.dahlan@kemenag.go.id',
    description: 'Email address of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Kinerja2025!',
    description: 'Password must be at least 8 characters long',
    required: true,
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @ApiProperty({
    example: 'Ahmad Dahlan',
    description: 'Full name of the user',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'USER',
    enum: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    description: 'Role of the user in the system',
    required: false,
    default: 'USER',
  })
  @IsOptional()
  @IsEnum(['USER', 'ADMIN', 'SUPER_ADMIN'])
  role?: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'ahmad.dahlan@kemenag.go.id',
    description: 'Registered email address',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Kinerja2025!',
    description: 'User password',
    required: true,
  })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Valid refresh token',
    required: true,
  })
  @IsString()
  refreshToken: string;
}
```

---

## src/modules/auth/auth.controller.ts

```typescript
import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Req, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard, JwtRefreshGuard } from './guards';
import { GetUser } from './decorators';
import { AuthResponse } from './interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refreshTokens(@Req() req: Request): Promise<AuthResponse> {
    const user = req.user as any;
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  async logout(@GetUser('id') userId: string): Promise<{ message: string }> {
    await this.authService.logout(userId);
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Current user data' })
  async getCurrentUser(@GetUser() user: any) {
    return user;
  }
}
```

---

## src/modules/auth/auth.module.ts

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN') || '7d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

---

## src/modules/auth/interfaces/index.ts

```typescript
export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface UserFromJwt {
  id: string;
  email: string;
  role: string;
}
```

---

## src/modules/files/files.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';

@ApiTags('files')
@Controller('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        category: {
          type: 'string',
          enum: ['FOTO_PEGAWAI', 'LOGO_INSTANSI', 'TTD', 'LAMPIRAN', 'DOKUMEN', 'OTHER'],
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: string,
    @Body('category') category?: string,
  ) {
    return this.filesService.uploadFile(file, userId, category);
  }

  @Post('upload-multiple')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @GetUser('id') userId: string,
    @Body('category') category?: string,
  ) {
    return this.filesService.uploadMultipleFiles(files, userId, category);
  }

  @Post('upload-base64')
  @ApiOperation({ summary: 'Upload base64 encoded image' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          description: 'Base64 encoded image data',
        },
        category: {
          type: 'string',
          enum: ['FOTO_PEGAWAI', 'LOGO_INSTANSI', 'TTD', 'LAMPIRAN', 'DOKUMEN', 'OTHER'],
        },
      },
    },
  })
  async uploadBase64(
    @Body('data') base64Data: string,
    @GetUser('id') userId: string,
    @Body('category') category?: string,
  ) {
    return this.filesService.saveBase64Image(base64Data, userId, category);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ) {
    return this.filesService.findAll(parseInt(page || '1'), parseInt(limit || '10'), category);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get storage statistics' })
  getStatistics() {
    return this.filesService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by ID' })
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
```

---

## src/modules/files/files.service.ts

```typescript
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/common/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);
  private readonly uploadPath: string;
  private readonly maxFileSize: number;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.uploadPath = this.config.get('UPLOAD_DEST') || './uploads';
    this.maxFileSize = parseInt(this.config.get('MAX_FILE_SIZE') || '10485760', 10);

    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  /**
   * Upload single file
   */
  async uploadFile(file: Express.Multer.File, uploadedBy: string, category: string = 'OTHER') {
    this.logger.log(`Uploading file: ${file.originalname}`);

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File terlalu besar. Maksimal ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }

    const fileRecord = await this.prisma.fileUpload.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        url: `/uploads/${file.filename}`,
        uploadedBy,
        category: category as any,
      },
    });

    this.logger.log(`File uploaded: ${fileRecord.id}`);
    return fileRecord;
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: Express.Multer.File[],
    uploadedBy: string,
    category: string = 'OTHER',
  ) {
    const uploadedFiles = await Promise.all(
      files.map((file) => this.uploadFile(file, uploadedBy, category)),
    );

    return uploadedFiles;
  }

  /**
   * Get file by id
   */
  async findOne(id: string) {
    return this.prisma.fileUpload.findUnique({
      where: { id },
    });
  }

  /**
   * Get all files with pagination
   */
  async findAll(page: number = 1, limit: number = 10, category?: string) {
    const skip = (page - 1) * limit;
    const where = category ? { category: category as any } : {};

    const [data, total] = await Promise.all([
      this.prisma.fileUpload.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.fileUpload.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Delete file
   */
  async remove(id: string) {
    const file = await this.prisma.fileUpload.findUnique({
      where: { id },
    });

    if (!file) {
      throw new BadRequestException('File tidak ditemukan');
    }

    // Delete physical file
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (error) {
      this.logger.error(`Failed to delete physical file: ${error.message}`);
    }

    // Delete from database
    await this.prisma.fileUpload.delete({
      where: { id },
    });

    this.logger.log(`File deleted: ${id}`);
    return { message: 'File berhasil dihapus' };
  }

  /**
   * Process base64 image and save to disk
   */
  async saveBase64Image(
    base64Data: string,
    uploadedBy: string,
    category: string = 'OTHER',
  ): Promise<any> {
    // Extract base64 content
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new BadRequestException('Invalid base64 format');
    }

    const mimetype = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const size = buffer.length;

    // Validate size
    if (size > this.maxFileSize) {
      throw new BadRequestException(
        `File terlalu besar. Maksimal ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }

    // Generate filename
    const ext = mimetype.split('/')[1];
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    const filepath = path.join(this.uploadPath, filename);

    // Save to disk
    fs.writeFileSync(filepath, buffer);

    // Save to database
    const fileRecord = await this.prisma.fileUpload.create({
      data: {
        filename,
        originalName: filename,
        mimetype,
        size,
        path: filepath,
        url: `/uploads/${filename}`,
        uploadedBy,
        category: category as any,
      },
    });

    this.logger.log(`Base64 image saved: ${fileRecord.id}`);
    return fileRecord;
  }

  /**
   * Get storage statistics
   */
  async getStatistics() {
    const [totalFiles, totalSize, byCategory] = await Promise.all([
      this.prisma.fileUpload.count(),
      this.prisma.fileUpload.aggregate({
        _sum: {
          size: true,
        },
      }),
      this.prisma.fileUpload.groupBy({
        by: ['category'],
        _count: true,
        _sum: {
          size: true,
        },
      }),
    ]);

    return {
      totalFiles,
      totalSize: totalSize._sum.size || 0,
      byCategory,
    };
  }
}
```

---

## src/modules/files/files.module.ts

```typescript
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: diskStorage({
          destination: config.get('UPLOAD_DEST') || './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        limits: {
          fileSize: parseInt(config.get('MAX_FILE_SIZE') || '10485760', 10),
        },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
```

---

## src/modules/reports/reports.service.ts

```typescript
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async generateReport(dto: CreateReportDto, userId: string) {
    this.logger.log(`Generating report for user: ${userId}`);

    const pegawai = await this.prisma.pegawai.findUnique({
      where: { userId },
      include: { akademik: true },
    });

    if (!pegawai) {
      throw new NotFoundException('Data pegawai tidak ditemukan');
    }

    const instansi = await this.prisma.instansi.findFirst({
      where: { isActive: true },
    });

    if (!instansi) {
      throw new BadRequestException('Data instansi tidak ditemukan');
    }

    const aiResult = await this.aiService.generateReport({
      model: dto.modelAI,
      bulan: dto.bulan,
      tahun: dto.tahun,
      pegawai: {
        nama: pegawai.nama,
        nip: pegawai.nip,
        jabatan: pegawai.jabatan,
        golongan: pegawai.golongan ?? undefined,
        unitKerja: pegawai.unitKerja,
        jenisPegawai: pegawai.jenisPegawai,
        masaKerjaTahun: pegawai.masaKerjaTahun,
        masaKerjaBulan: pegawai.masaKerjaBulan,
      },
      kinerja: {
        tugasPokok: dto.tugasPokok,
        tugasTambahan: dto.tugasTambahan,
        targetTahunan: dto.targetTahunan,
        hambatan: dto.hambatan,
        solusi: dto.solusi,
      },
      akademik: pegawai.akademik
        ? {
            kurikulum: pegawai.akademik.kurikulum,
            tahunPelajaran: pegawai.akademik.tahunPelajaran,
            semester: pegawai.akademik.semester,
            mapel: pegawai.akademik.mapel,
            kelas: pegawai.akademik.kelas,
            jamMengajar: pegawai.akademik.jamMengajar,
            jumlahSiswa: pegawai.akademik.jumlahSiswa,
            ekskul: pegawai.akademik.ekskul ?? undefined,
          }
        : undefined,
      maxTokens: dto.tokenLimit || 2000,
      customInstruction: dto.customInstruction,
    });

    if (!aiResult.success || !aiResult.content) {
      throw new BadRequestException(`Gagal generate laporan: ${aiResult.error}`);
    }

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.report.findFirst({
        where: {
          pegawaiId: pegawai.id,
          bulan: dto.bulan,
          tahun: dto.tahun,
        },
      });

      if (existing) {
        throw new BadRequestException(`Laporan untuk periode ${dto.bulan}/${dto.tahun} sudah ada`);
      }

      const count = await tx.report.count({
        where: { bulan: dto.bulan, tahun: dto.tahun },
      });

      const nomorUrut = String(count + 1).padStart(3, '0');
      const bulanStr = String(dto.bulan).padStart(2, '0');
      const nomorDokumen = `${nomorUrut}/LPKP/${bulanStr}/${dto.tahun}`;

      const report = await tx.report.create({
        data: {
          pegawaiId: pegawai.id,
          instansiId: instansi.id,
          userId,
          bulan: dto.bulan,
          tahun: dto.tahun,
          tugasPokok: dto.tugasPokok,
          tugasTambahan: dto.tugasTambahan,
          targetTahunan: dto.targetTahunan,
          hambatan: dto.hambatan,
          solusi: dto.solusi,
          content: aiResult.content!,
          modelAI: dto.modelAI,
          tokensUsed: aiResult.tokensUsed || 0,
          nomorDokumen,
          status: 'DRAFT',
        },
        include: {
          pegawai: {
            select: {
              nama: true,
              nip: true,
              jabatan: true,
            },
          },
          instansi: {
            select: {
              header3: true,
            },
          },
        },
      });

      this.logger.log(`Report created via transaction: ${report.id}`);
      return report;
    });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    options?: {
      userId?: string;
      status?: string;
      bulan?: number;
      tahun?: number;
    },
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (options?.userId) where.userId = options.userId;
    if (options?.status) where.status = options.status;
    if (options?.bulan) where.bulan = options.bulan;
    if (options?.tahun) where.tahun = options.tahun;

    const [data, total] = await Promise.all([
      this.prisma.report.findMany({
        where,
        skip,
        take: limit,
        include: {
          pegawai: {
            select: {
              nama: true,
              nip: true,
              jabatan: true,
            },
          },
          instansi: {
            select: {
              header3: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.report.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        pegawai: {
          include: {
            akademik: true,
          },
        },
        instansi: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Laporan tidak ditemukan');
    }

    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException('Laporan tidak ditemukan');
    }

    const updated = await this.prisma.report.update({
      where: { id },
      data: {
        ...updateReportDto,
        status: updateReportDto.status as any,
      },
      include: {
        pegawai: {
          select: {
            nama: true,
            nip: true,
          },
        },
      },
    });

    this.logger.log(`Report updated: ${id}`);
    return updated;
  }

  async submitReport(id: string) {
    const report = await this.findOne(id);

    if (report.status !== 'DRAFT') {
      throw new BadRequestException('Hanya laporan dengan status DRAFT yang bisa disubmit');
    }

    const updated = await this.prisma.report.update({
      where: { id },
      data: {
        status: 'SUBMITTED',
        publishedAt: new Date(),
      },
    });

    this.logger.log(`Report submitted: ${id}`);
    return updated;
  }

  async approveReport(id: string) {
    const report = await this.findOne(id);

    if (report.status !== 'SUBMITTED') {
      throw new BadRequestException('Hanya laporan yang sudah disubmit yang bisa diapprove');
    }

    const updated = await this.prisma.report.update({
      where: { id },
      data: { status: 'APPROVED' },
    });

    this.logger.log(`Report approved: ${id}`);
    return updated;
  }

  async remove(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException('Laporan tidak ditemukan');
    }

    await this.prisma.report.delete({
      where: { id },
    });

    this.logger.log(`Report deleted: ${id}`);
    return { message: 'Laporan berhasil dihapus' };
  }

  async getStatistics(userId?: string) {
    const where = userId ? { userId } : {};

    const [total, byStatus, byMonth] = await Promise.all([
      this.prisma.report.count({ where }),
      this.prisma.report.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
      this.prisma.report.groupBy({
        by: ['bulan', 'tahun'],
        where,
        _count: true,
        orderBy: {
          tahun: 'desc',
        },
        take: 12,
      }),
    ]);

    return {
      total,
      byStatus,
      byMonth,
    };
  }
}
```

---

## src/modules/reports/queues/report.queue.ts

```typescript
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ReportQueue {
  constructor(@InjectQueue('report-generation') private reportQueue: Queue) {}

  async addReportGenerationJob(data: any) {
    return this.reportQueue.add('generate-report', data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

  async addExportJob(reportId: string, format: 'pdf' | 'docx') {
    return this.reportQueue.add(
      'export-report',
      { reportId, format },
      {
        attempts: 2,
        backoff: {
          type: 'fixed',
          delay: 1000,
        },
      },
    );
  }

  async getJobStatus(jobId: string) {
    const job = await this.reportQueue.getJob(jobId);
    if (!job) {
      return null;
    }

    return {
      id: job.id,
      status: await job.getState(),
      progress: job.progress,
      data: job.data,
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
    };
  }
}
```

---

## src/modules/reports/processors/report.processor.ts

```typescript
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ReportsService } from '../reports.service';
import { DocxExportService } from '../services/docx-export.service';
import { PdfExportService } from '../services/pdf-export.service';

@Processor('report-generation')
export class ReportProcessor extends WorkerHost {
  private readonly logger = new Logger(ReportProcessor.name);

  constructor(
    private reportsService: ReportsService,
    private docxExportService: DocxExportService,
    private pdfExportService: PdfExportService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'generate-report':
        return this.handleGenerateReport(job);
      case 'export-report':
        return this.handleExportReport(job);
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  }

  private async handleGenerateReport(job: Job) {
    const { dto, userId } = job.data;

    try {
      await job.updateProgress(10);
      this.logger.log(`Generating report for user: ${userId}`);

      const result = await this.reportsService.generateReport(dto, userId);

      await job.updateProgress(100);
      this.logger.log(`Report generated successfully: ${result.id}`);

      return result;
    } catch (error) {
      this.logger.error(`Failed to generate report: ${error.message}`);
      throw error;
    }
  }

  private async handleExportReport(job: Job) {
    const { reportId, format } = job.data;

    try {
      await job.updateProgress(20);
      this.logger.log(`Exporting report ${reportId} as ${format}`);

      const report = await this.reportsService.findOne(reportId);

      await job.updateProgress(50);

      let buffer: Buffer;
      if (format === 'docx') {
        buffer = await this.docxExportService.generate(report);
      } else if (format === 'pdf') {
        buffer = await this.pdfExportService.generate(report);
      } else {
        throw new Error(`Unsupported format: ${format}`);
      }

      await job.updateProgress(100);
      this.logger.log(`Report exported successfully: ${buffer.length} bytes`);

      return {
        reportId,
        format,
        size: buffer.length,
        success: true,
      };
    } catch (error) {
      this.logger.error(`Failed to export report: ${error.message}`);
      throw error;
    }
  }
}
```

---

## src/modules/reports/reports.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';
import { DocxExportService } from './services/docx-export.service';
import { PdfExportService } from './services/pdf-export.service';

@ApiTags('reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly docxExportService: DocxExportService,
    private readonly pdfExportService: PdfExportService,
  ) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate new report using AI' })
  @ApiResponse({ status: 201, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async generateReport(@Body() dto: CreateReportDto, @GetUser('id') userId: string) {
    return this.reportsService.generateReport(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports with filters' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'bulan', required: false, type: Number })
  @ApiQuery({ name: 'tahun', required: false, type: Number })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('bulan') bulan?: string,
    @Query('tahun') tahun?: string,
    @GetUser('id') userId?: string,
  ) {
    return this.reportsService.findAll(parseInt(page || '1'), parseInt(limit || '10'), {
      userId,
      status,
      bulan: bulan ? parseInt(bulan) : undefined,
      tahun: tahun ? parseInt(tahun) : undefined,
    });
  }

  @Get('my-reports')
  @ApiOperation({ summary: 'Get current user reports' })
  async getMyReports(
    @GetUser('id') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reportsService.findAll(parseInt(page || '1'), parseInt(limit || '10'), { userId });
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get reports statistics' })
  async getStatistics(@GetUser('id') userId?: string) {
    return this.reportsService.getStatistics(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update report' })
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(id, updateReportDto);
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit report for approval' })
  async submitReport(@Param('id') id: string) {
    return this.reportsService.submitReport(id);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Approve report' })
  async approveReport(@Param('id') id: string) {
    return this.reportsService.approveReport(id);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Reject report' })
  async rejectReport(@Param('id') id: string, @Body('reason') reason: string) {
    return this.reportsService.update(id, {
      status: 'REJECTED',
      metadata: { reason },
    } as UpdateReportDto);
  }

  @Get(':id/export/docx')
  @ApiOperation({ summary: 'Export report to DOCX' })
  async exportDOCX(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const report = await this.reportsService.findOne(id);
    const buffer = await this.docxExportService.generate(report);

    const filename = `Laporan_Kinerja_${report.pegawai.nama}_${report.bulan}_${report.tahun}.docx`;

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    return new StreamableFile(buffer);
  }

  @Get(':id/export/pdf')
  @ApiOperation({ summary: 'Export report to PDF' })
  async exportPDF(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const report = await this.reportsService.findOne(id);
    const buffer = await this.pdfExportService.generate(report);

    const filename = `Laporan_Kinerja_${report.pegawai.nama}_${report.bulan}_${report.tahun}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    return new StreamableFile(buffer);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete report' })
  async remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
```

---

## src/modules/reports/dto/generate-report.dto.ts

```typescript
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsObject,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class PegawaiDataDto {
  @ApiProperty()
  @IsString()
  nama: string;

  @ApiProperty()
  @IsString()
  nip: string;

  @ApiProperty()
  @IsString()
  jabatan: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  golongan?: string;

  @ApiProperty()
  @IsString()
  unitKerja: string;

  @ApiProperty()
  @IsString()
  jenisPegawai: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  masaKerjaTahun?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  masaKerjaBulan?: number;
}

class AkademikDataDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  kurikulum?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tahunPelajaran?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  semester?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mapel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  kelas?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  jamMengajar?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  jumlahSiswa?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ekskul?: string;
}

class KinerjaDataDto {
  @ApiProperty()
  @IsString()
  tugasPokok: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tugasTambahan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  targetTahunan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hambatan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  solusi?: string;
}

export class GenerateReportDto {
  @ApiProperty({
    example: 'gemini',
    enum: ['gemini', 'claude', 'gpt', 'groq'],
    description: 'AI model to use for generation',
  })
  @IsEnum(['gemini', 'claude', 'gpt', 'groq'])
  model: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 12 })
  @IsNumber()
  @Min(1)
  @Max(12)
  bulan: number;

  @ApiProperty({ example: 2025 })
  @IsNumber()
  tahun: number;

  @ApiProperty({ type: PegawaiDataDto })
  @ValidateNested()
  @Type(() => PegawaiDataDto)
  pegawai: PegawaiDataDto;

  @ApiProperty({ type: KinerjaDataDto })
  @ValidateNested()
  @Type(() => KinerjaDataDto)
  kinerja: KinerjaDataDto;

  @ApiProperty({ type: AkademikDataDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AkademikDataDto)
  akademik?: AkademikDataDto;

  @ApiProperty({ example: 2000, default: 2000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(500)
  @Max(8000)
  maxTokens?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customInstruction?: string;
}
```

---

## src/modules/reports/dto/update-report.dto.ts

```typescript
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsObject } from 'class-validator';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiProperty({
    required: false,
    enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'],
  })
  @IsOptional()
  @IsEnum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'])
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  metadata?: any;
}
```

---

## src/modules/reports/dto/create-report.dto.ts

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    example: 'gemini',
    enum: ['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'],
    description: 'AI model to use for generation',
  })
  @IsEnum(['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'])
  modelAI: string;

  @ApiProperty({
    example: 1,
    minimum: 1,
    maximum: 12,
    description: 'Month of the report (1-12)',
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  bulan: number;

  @ApiProperty({
    example: 2025,
    description: 'Year of the report',
  })
  @IsNumber()
  tahun: number;

  @ApiProperty({
    example:
      'Merencanakan dan melaksanakan pembelajaran, mengevaluasi dan menilai hasil pembelajaran',
    description: 'Main duties description for AI context',
  })
  @IsString()
  tugasPokok: string;

  @ApiProperty({
    example: 'Wali Kelas VII-A, Anggota Tim Penjamin Mutu, Piket Harian',
    description: 'Additional duties (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  tugasTambahan?: string;

  @ApiProperty({
    example: 'Meningkatkan nilai rata-rata kelas menjadi 80, Lulus 100%',
    description: 'Annual performance targets',
    required: false,
  })
  @IsOptional()
  @IsString()
  targetTahunan?: string;

  @ApiProperty({
    example: 'Sarana prasarana multimedia terbatas, koneksi internet lambat',
    description: 'Obstacles encountered during the month',
    required: false,
  })
  @IsOptional()
  @IsString()
  hambatan?: string;

  @ApiProperty({
    example: 'Menggunakan media pembelajaran sederhana, tethering hotspot pribadi',
    description: 'Solutions applied to obstacles',
    required: false,
  })
  @IsOptional()
  @IsString()
  solusi?: string;

  @ApiProperty({
    example: 2000,
    default: 2000,
    minimum: 500,
    maximum: 8000,
    description: 'Max tokens for AI generation',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(500)
  @Max(8000)
  tokenLimit?: number;

  @ApiProperty({
    example: 'Fokuskan pada kegiatan remedial dan pengayaan',
    description: 'Additional custom instruction for AI',
    required: false,
  })
  @IsOptional()
  @IsString()
  customInstruction?: string;
}

export class UpdateReportDto {
  @ApiProperty({
    example: '# Laporan Kinerja\n\n...',
    description: 'Markdown content of the report',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    required: false,
    enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'],
    example: 'SUBMITTED',
  })
  @IsOptional()
  @IsEnum(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'])
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tugasPokok?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tugasTambahan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  targetTahunan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hambatan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  solusi?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  metadata?: any;
}
```

---

## src/modules/reports/services/docx-export.service.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  VerticalAlign,
  HeightRule,
} from 'docx';

@Injectable()
export class DocxExportService {
  private readonly logger = new Logger(DocxExportService.name);

  async generate(report: any): Promise<Buffer> {
    try {
      this.logger.log(`Generating DOCX for report: ${report.id}`);

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: {
                font: 'Times New Roman',
                size: 24, // 12pt (docx uses half-points)
              },
              paragraph: {
                spacing: { line: 276 }, // 1.15 spacing
              },
            },
            heading1: {
              run: {
                font: 'Times New Roman',
                size: 28, // 14pt
                bold: true,
                color: '000000',
              },
              paragraph: {
                spacing: { before: 240, after: 120 },
              },
            },
            heading2: {
              run: {
                font: 'Times New Roman',
                size: 24, // 12pt
                bold: true,
                color: '000000',
              },
              paragraph: {
                spacing: { before: 240, after: 120 },
              },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1440, // 1 inch
                  right: 1440,
                  bottom: 1440,
                  left: 1440,
                },
              },
            },
            children: this.buildDocumentContent(report),
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      this.logger.log(`DOCX generated successfully: ${buffer.length} bytes`);

      return buffer;
    } catch (error) {
      this.logger.error(`Failed to generate DOCX: ${error.message}`);
      throw error;
    }
  }

  private buildDocumentContent(report: any): any[] {
    const children: any[] = [];

    // ==========================================
    // 1. Header (Kop Surat)
    // ==========================================
    children.push(
      new Paragraph({
        text: (report.instansi?.header1 || 'KEMENTERIAN AGAMA REPUBLIK INDONESIA').toUpperCase(),
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2, // Menggunakan style heading tapi font disesuaikan
      }),
      new Paragraph({
        text: (report.instansi?.header2 || 'KANTOR KABUPATEN').toUpperCase(),
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        text: (report.instansi?.header3 || 'MADRASAH TSANAWIYAH NEGERI').toUpperCase(),
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        text: report.instansi?.alamat || '',
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      }),
      // Garis Pembatas Kop
      new Paragraph({
        border: {
          bottom: {
            color: '000000',
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
      new Paragraph({ text: '' }), // Spacing
    );

    // ==========================================
    // 2. Judul Laporan
    // ==========================================
    const namaBulan = this.getBulanName(report.bulan);
    children.push(
      new Paragraph({
        text: 'LAPORAN KINERJA PEGAWAI',
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Periode: ${namaBulan} ${report.tahun}`,
            bold: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
      }),
    );

    // ==========================================
    // 3. Konten Utama (Parse Markdown)
    // ==========================================
    const contentParagraphs = this.parseMarkdownContent(report.content);
    children.push(...contentParagraphs);

    // ==========================================
    // 4. Footer (Tanda Tangan)
    // ==========================================
    const titimangsa = report.instansi?.titimangsa || 'Pandeglang';
    const tanggal = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Tabel Transparan untuk Tanda Tangan (Agar rapi di kanan)
    children.push(
      new Paragraph({ text: '' }),
      new Paragraph({ text: '' }),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({ children: [], width: { size: 50, type: WidthType.PERCENTAGE } }), // Spasi Kiri
              new TableCell({
                children: [
                  new Paragraph({
                    text: `${titimangsa}, ${tanggal}`,
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({
                    text: 'Pejabat Penilai,',
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({ text: '' }),
                  new Paragraph({ text: '' }),
                  new Paragraph({ text: '' }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: report.instansi?.namaKepala || 'Nama Kepala',
                        bold: true,
                        underline: { type: 'single' },
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({
                    text: `NIP. ${report.instansi?.nipKepala || '-'}`,
                    alignment: AlignmentType.CENTER,
                  }),
                ],
                width: { size: 50, type: WidthType.PERCENTAGE },
              }),
            ],
          }),
        ],
      }),
    );

    return children;
  }

  /**
   * Mengubah Markdown menjadi Objek DOCX
   * Mendukung: Headers, Paragraphs, Bold, List, dan Table
   */
  private parseMarkdownContent(content: string): any[] {
    const docxElements: any[] = [];
    const lines = content.split('\n');

    let inTable = false;
    let tableRows: TableRow[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // --- LOGIKA TABEL ---
      if (line.startsWith('|') && line.endsWith('|')) {
        // Jika baru masuk ke blok tabel
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }

        // Cek apakah ini baris separator (contoh: |---|---|) -> Skip
        // Kita gunakan ini untuk menentukan alignment nanti jika perlu, tapi sekarang skip saja
        if (
          line
            .replace(/\|/g, '')
            .trim()
            .match(/^[-:\s]+$/)
        ) {
          continue;
        }

        // Parse sel tabel
        // Split berdasarkan '|', hapus elemen pertama dan terakhir yang kosong
        const cellsData = line
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

        const tableCells = cellsData.map((cellText) => {
          return new TableCell({
            children: [new Paragraph({ text: cellText })],
            verticalAlign: VerticalAlign.CENTER,
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            },
          });
        });

        tableRows.push(
          new TableRow({
            children: tableCells,
            height: { value: 400, rule: HeightRule.AUTO },
          }),
        );
        continue; // Lanjut ke baris berikutnya
      }

      // Jika sebelumnya ada tabel dan sekarang baris bukan tabel -> Render Tabel
      if (inTable) {
        if (tableRows.length > 0) {
          docxElements.push(
            new Table({
              rows: tableRows,
              width: { size: 100, type: WidthType.PERCENTAGE },
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: '' }), // Spasi setelah tabel
          );
        }
        inTable = false;
        tableRows = [];
      }

      // --- LOGIKA TEXT BIASA ---

      if (line === '') {
        docxElements.push(new Paragraph({ text: '' }));
      } else if (line.startsWith('## ')) {
        // Heading 2 (Bab)
        docxElements.push(
          new Paragraph({
            text: line.replace('## ', ''),
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.LEFT,
          }),
        );
      } else if (line.startsWith('### ')) {
        // Heading 3 (Sub Bab)
        docxElements.push(
          new Paragraph({
            text: line.replace('### ', ''),
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.LEFT,
          }),
        );
      } else if (line.startsWith('#### ')) {
        // Heading 4
        docxElements.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line.replace('#### ', ''),
                bold: true,
              }),
            ],
          }),
        );
      } else if (line.match(/^[-*]\s/)) {
        // Bullet List
        docxElements.push(
          new Paragraph({
            text: line.replace(/^[-*]\s/, ''),
            bullet: { level: 0 },
          }),
        );
      } else if (line.match(/^\d+\.\s/)) {
        // Numbered List
        docxElements.push(
          new Paragraph({
            text: line.replace(/^\d+\.\s/, ''),
            numbering: { reference: 'default-numbering', level: 0 },
          }),
        );
      } else {
        // Paragraf Biasa
        // Handle bold text (**text**) secara sederhana
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const childrenRuns = parts.map((part) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return new TextRun({
              text: part.slice(2, -2),
              bold: true,
            });
          }
          return new TextRun({ text: part });
        });

        docxElements.push(
          new Paragraph({
            children: childrenRuns,
            alignment: AlignmentType.JUSTIFIED,
          }),
        );
      }
    }

    // Cek jika file berakhir dengan tabel yang belum di-push
    if (inTable && tableRows.length > 0) {
      docxElements.push(
        new Table({
          rows: tableRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
          alignment: AlignmentType.CENTER,
        }),
      );
    }

    return docxElements;
  }

  private getBulanName(bulan: number): string {
    const namaBulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return namaBulan[bulan - 1] || '';
  }
}
```

---

## src/modules/reports/services/pdf-export.service.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { marked } from 'marked';

@Injectable()
export class PdfExportService {
  private readonly logger = new Logger(PdfExportService.name);

  async generate(report: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        this.logger.log(`Generating PDF for report: ${report.id}`);

        const doc = new PDFDocument({
          size: 'A4',
          margins: {
            top: 72, // 1 inch
            bottom: 72,
            left: 72,
            right: 72,
          },
          bufferPages: true,
        });

        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          this.logger.log(`PDF generated successfully: ${pdfBuffer.length} bytes`);
          resolve(pdfBuffer);
        });
        doc.on('error', reject);

        // Build PDF content
        this.buildPDFContent(doc, report);

        doc.end();
      } catch (error) {
        this.logger.error(`Failed to generate PDF: ${error.message}`);
        reject(error);
      }
    });
  }

  private buildPDFContent(doc: PDFKit.PDFDocument, report: any): void {
    // Header (Kop Surat)
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(report.instansi.header1 || 'KEMENTERIAN AGAMA REPUBLIK INDONESIA', { align: 'center' });

    doc.fontSize(12).text(report.instansi.header2 || 'KANTOR KABUPATEN', { align: 'center' });

    doc
      .fontSize(12)
      .text(report.instansi.header3 || 'MADRASAH TSANAWIYAH NEGERI', { align: 'center' });

    doc
      .fontSize(10)
      .font('Helvetica')
      .text(report.instansi.alamat || '', { align: 'center' });

    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Judul Laporan
    const namaBulan = this.getBulanName(report.bulan);
    doc.fontSize(16).font('Helvetica-Bold').text('LAPORAN KINERJA PEGAWAI', { align: 'center' });

    doc
      .fontSize(12)
      .font('Helvetica')
      .text(`Periode: ${namaBulan} ${report.tahun}`, { align: 'center' });
    doc.moveDown(2);

    // Parse and render markdown content
    this.renderMarkdownContent(doc, report.content);

    // Footer (Tanda Tangan)
    doc.moveDown(2);
    const titimangsa = report.instansi.titimangsa || 'Pandeglang';
    const tanggal = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    doc.fontSize(11).text(`${titimangsa}, ${tanggal}`, { align: 'right' });
    doc.text('Pejabat Penilai,', { align: 'right' });
    doc.moveDown(3);
    doc.text(report.instansi.namaKepala || '', { align: 'right' });
    doc.text(`NIP. ${report.instansi.nipKepala || ''}`, { align: 'right' });
  }

  private renderMarkdownContent(doc: PDFKit.PDFDocument, content: string): void {
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('## ')) {
        // H2 - BAB
        doc.moveDown(0.5);
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .text(trimmed.replace('## ', ''), { continued: false });
        doc.moveDown(0.5);
      } else if (trimmed.startsWith('### ')) {
        // H3 - Sub BAB
        doc.moveDown(0.3);
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text(trimmed.replace('### ', ''), { continued: false });
        doc.moveDown(0.3);
      } else if (trimmed.startsWith('| ') && trimmed.endsWith(' |')) {
        // Table - simplified rendering
        doc.fontSize(10).font('Helvetica').text(trimmed);
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        // Bullet list
        doc
          .fontSize(11)
          .font('Helvetica')
          .text('  • ' + trimmed.substring(2), { continued: false });
      } else if (trimmed.match(/^\d+\.\s/)) {
        // Numbered list
        doc.fontSize(11).font('Helvetica').text(trimmed);
      } else if (trimmed !== '' && !trimmed.startsWith('---')) {
        // Regular paragraph
        doc.fontSize(11).font('Helvetica').text(trimmed, {
          align: 'justify',
          lineGap: 2,
        });
        doc.moveDown(0.3);
      } else if (trimmed === '') {
        doc.moveDown(0.5);
      }

      // Check for page break
      if (doc.y > 700) {
        doc.addPage();
      }
    }
  }

  private getBulanName(bulan: number): string {
    const namaBulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return namaBulan[bulan - 1] || '';
  }
}
```

---

## src/modules/reports/reports.module.ts

```typescript
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ReportQueue } from './queues/report.queue';
import { ReportProcessor } from './processors/report.processor';
import { DocxExportService } from './services/docx-export.service';
import { PdfExportService } from './services/pdf-export.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'report-generation',
    }),
    AiModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ReportQueue, ReportProcessor, DocxExportService, PdfExportService],
  exports: [ReportsService, DocxExportService, PdfExportService],
})
export class ReportsModule {}
```

---

## src/modules/users/users.service.ts

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(options?: { page?: number; limit?: number; role?: string }) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;
    const where = options?.role ? { role: options.role as any } : {};

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          isActive: true,
          createdAt: true,
          lastLogin: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
      },
    });
  }

  async toggleStatus(id: string) {
    const user = await this.findOne(id);
    return this.update(id, { isActive: !user.isActive });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

---

## src/modules/users/users.controller.ts

```typescript
import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'role', required: false, type: String })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('role') role?: string,
  ) {
    const pageNum = parseInt(page || '1');
    const limitNum = parseInt(limit || '10');
    return this.usersService.findAll({ page: pageNum, limit: limitNum, role });
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@GetUser('id') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.update(id, updateData);
  }

  @Patch(':id/toggle-status')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Toggle user active status' })
  toggleStatus(@Param('id') id: string) {
    return this.usersService.toggleStatus(id);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
```

---

## src/modules/users/users.module.ts

```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

---

## src/modules/health/health.controller.ts

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { Public } from '../auth/decorators';
import { PrismaService } from '@/common/prisma/prisma.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  @ApiOperation({ summary: 'Health check endpoint' })
  check() {
    return this.health.check([() => this.prismaHealth.pingCheck('database', this.prisma)]);
  }

  @Get('info')
  @Public()
  @ApiOperation({ summary: 'Get system info' })
  getInfo() {
    return {
      name: 'E-Kinerja Backend API',
      version: '1.0.0',
      environment: process.env.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
```

---

## src/modules/health/health.module.ts

```typescript
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}
```

---

## src/modules/notifications/notifications.gateway.ts

```typescript
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
```

---

## src/modules/notifications/notifications.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @GetUser('id') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.notificationsService.findByUser(
      userId,
      parseInt(page || '1'),
      parseInt(limit || '20'),
    );
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notifications count' })
  async getUnreadCount(@GetUser('id') userId: string) {
    const count = await this.notificationsService.getUnreadCount(userId);
    return { count };
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.notificationsService.markAsRead(id, userId);
  }

  @Patch('read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllAsRead(@GetUser('id') userId: string) {
    return this.notificationsService.markAllAsRead(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification' })
  async remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.notificationsService.remove(id, userId);
  }
}
```

---

## src/modules/notifications/notifications.service.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  /**
   * Create and send notification
   */
  async create(
    userId: string,
    data: {
      title: string;
      message: string;
      type:
        | 'INFO'
        | 'SUCCESS'
        | 'WARNING'
        | 'ERROR'
        | 'REPORT_SUBMITTED'
        | 'REPORT_APPROVED'
        | 'REPORT_REJECTED';
      metadata?: any;
    },
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        title: data.title,
        message: data.message,
        type: data.type,
        metadata: data.metadata,
      },
    });

    // Send real-time notification via WebSocket
    this.notificationsGateway.sendToUser(userId, notification);

    this.logger.log(`Notification created for user ${userId}: ${notification.id}`);
    return notification;
  }

  /**
   * Get user notifications
   */
  async findByUser(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        unreadCount: await this.getUnreadCount(userId),
      },
    };
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Mark as read
   */
  async markAsRead(id: string, userId: string) {
    const notification = await this.prisma.notification.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { success: true };
  }

  /**
   * Mark all as read
   */
  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { success: true };
  }

  /**
   * Delete notification
   */
  async remove(id: string, userId: string) {
    await this.prisma.notification.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return { success: true };
  }

  /**
   * Send report notification
   */
  async sendReportNotification(
    userId: string,
    type: 'SUBMITTED' | 'APPROVED' | 'REJECTED',
    report: any,
  ) {
    const messages = {
      SUBMITTED: {
        title: 'Laporan Disubmit',
        message: `Laporan kinerja bulan ${report.bulan}/${report.tahun} telah disubmit untuk approval`,
        type: 'REPORT_SUBMITTED' as const,
      },
      APPROVED: {
        title: 'Laporan Disetujui',
        message: `Laporan kinerja bulan ${report.bulan}/${report.tahun} telah disetujui`,
        type: 'REPORT_APPROVED' as const,
      },
      REJECTED: {
        title: 'Laporan Ditolak',
        message: `Laporan kinerja bulan ${report.bulan}/${report.tahun} ditolak. Silakan periksa dan revisi.`,
        type: 'REPORT_REJECTED' as const,
      },
    };

    const config = messages[type];

    return this.create(userId, {
      ...config,
      metadata: {
        reportId: report.id,
        bulan: report.bulan,
        tahun: report.tahun,
      },
    });
  }
}
```

---

## src/modules/notifications/notifications.module.ts

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [JwtModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
```

---

## src/modules/pegawai/pegawai.controller.ts

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PegawaiService } from './pegawai.service';
import { CreatePegawaiDto } from './dto/create-pegawai.dto';
import { UpdatePegawaiDto } from './dto/update-pegawai.dto';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';

@ApiTags('pegawai')
@Controller('pegawai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PegawaiController {
  constructor(private readonly pegawaiService: PegawaiService) {}

  @Post()
  @ApiOperation({ summary: 'Create pegawai data' })
  @ApiResponse({ status: 201, description: 'Pegawai created successfully' })
  create(@Body() createPegawaiDto: CreatePegawaiDto, @GetUser('id') userId: string) {
    return this.pegawaiService.create(createPegawaiDto, userId);
  }

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get all pegawai' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.pegawaiService.findAll(parseInt(page || '1'), parseInt(limit || '10'), search);
  }

  @Get('statistics')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get pegawai statistics' })
  getStatistics() {
    return this.pegawaiService.getStatistics();
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user pegawai data' })
  getMyData(@GetUser('id') userId: string) {
    return this.pegawaiService.findByUserId(userId);
  }

  @Get('nip/:nip')
  @ApiOperation({ summary: 'Get pegawai by NIP' })
  findByNip(@Param('nip') nip: string) {
    return this.pegawaiService.findByNip(nip);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pegawai by ID' })
  findOne(@Param('id') id: string) {
    return this.pegawaiService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pegawai' })
  update(@Param('id') id: string, @Body() updatePegawaiDto: UpdatePegawaiDto) {
    return this.pegawaiService.update(id, updatePegawaiDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete pegawai' })
  remove(@Param('id') id: string) {
    return this.pegawaiService.remove(id);
  }
}
```

---

## src/modules/pegawai/pegawai.service.ts

```typescript
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreatePegawaiDto } from './dto/create-pegawai.dto';
import { UpdatePegawaiDto } from './dto/update-pegawai.dto';

@Injectable()
export class PegawaiService {
  private readonly logger = new Logger(PegawaiService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Create new pegawai
   */
  async create(createPegawaiDto: CreatePegawaiDto, userId: string) {
    this.logger.log(`Creating pegawai for user: ${userId}`);

    // Check if user already has pegawai
    const existing = await this.prisma.pegawai.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new BadRequestException('User sudah memiliki data pegawai');
    }

    // Check NIP uniqueness
    if (createPegawaiDto.nip) {
      const existingNip = await this.prisma.pegawai.findUnique({
        where: { nip: createPegawaiDto.nip },
      });

      if (existingNip) {
        throw new BadRequestException('NIP sudah terdaftar');
      }
    }

    const pegawai = await this.prisma.pegawai.create({
      data: {
        ...createPegawaiDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    this.logger.log(`Pegawai created: ${pegawai.id}`);
    return pegawai;
  }

  /**
   * Get all pegawai with pagination
   */
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { nama: { contains: search } },
            { nip: { contains: search } },
            { jabatan: { contains: search } },
            { unitKerja: { contains: search } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.pegawai.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              isActive: true,
            },
          },
          akademik: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.pegawai.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get pegawai by id
   */
  async findOne(id: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
          },
        },
        akademik: true,
        reports: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            bulan: true,
            tahun: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan ID ${id} tidak ditemukan`);
    }

    return pegawai;
  }

  /**
   * Get pegawai by user id
   */
  async findByUserId(userId: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { userId },
      include: {
        akademik: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    if (!pegawai) {
      throw new NotFoundException('Data pegawai tidak ditemukan untuk user ini');
    }

    return pegawai;
  }

  /**
   * Get pegawai by NIP
   */
  async findByNip(nip: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { nip },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        akademik: true,
      },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan NIP ${nip} tidak ditemukan`);
    }

    return pegawai;
  }

  /**
   * Update pegawai
   */
  async update(id: string, updatePegawaiDto: UpdatePegawaiDto) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { id },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan ID ${id} tidak ditemukan`);
    }

    // Check NIP uniqueness if changed
    if (updatePegawaiDto.nip && updatePegawaiDto.nip !== pegawai.nip) {
      const existingNip = await this.prisma.pegawai.findUnique({
        where: { nip: updatePegawaiDto.nip },
      });

      if (existingNip) {
        throw new BadRequestException('NIP sudah terdaftar');
      }
    }

    const updated = await this.prisma.pegawai.update({
      where: { id },
      data: updatePegawaiDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        akademik: true,
      },
    });

    this.logger.log(`Pegawai updated: ${id}`);
    return updated;
  }

  /**
   * Delete pegawai
   */
  async remove(id: string) {
    const pegawai = await this.prisma.pegawai.findUnique({
      where: { id },
    });

    if (!pegawai) {
      throw new NotFoundException(`Pegawai dengan ID ${id} tidak ditemukan`);
    }

    await this.prisma.pegawai.delete({
      where: { id },
    });

    this.logger.log(`Pegawai deleted: ${id}`);
    return { message: 'Pegawai berhasil dihapus' };
  }

  /**
   * Get statistics
   */
  async getStatistics() {
    const [total, byJenis, byStatus, byJabatan] = await Promise.all([
      this.prisma.pegawai.count(),
      this.prisma.pegawai.groupBy({
        by: ['jenisPegawai'],
        _count: true,
      }),
      this.prisma.pegawai.groupBy({
        by: ['statusPegawai'],
        _count: true,
      }),
      this.prisma.pegawai.groupBy({
        by: ['jabatan'],
        _count: true,
        orderBy: {
          _count: {
            jabatan: 'desc',
          },
        },
        take: 5,
      }),
    ]);

    return {
      total,
      byJenis,
      byStatus,
      topJabatan: byJabatan,
    };
  }
}
```

---

## src/modules/pegawai/pegawai.module.ts

```typescript
import { Module } from '@nestjs/common';
import { PegawaiService } from './pegawai.service';
import { PegawaiController } from './pegawai.controller';

@Module({
  controllers: [PegawaiController],
  providers: [PegawaiService],
  exports: [PegawaiService],
})
export class PegawaiModule {}
```

---

## src/modules/pegawai/dto/update-pegawai.dto.ts

```typescript
export { UpdatePegawaiDto } from './create-pegawai.dto';
```

---

## src/modules/pegawai/dto/create-pegawai.dto.ts

```typescript
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsInt,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

enum Gender {
  L = 'L',
  P = 'P',
}

enum JenisPegawai {
  PNS = 'PNS',
  PPPK = 'PPPK',
  HONORER = 'HONORER',
  GTT = 'GTT',
  PTT = 'PTT',
  GURU = 'GURU',
}

enum StatusPegawai {
  AKTIF = 'AKTIF',
  CUTI = 'CUTI',
  TUGAS_BELAJAR = 'TUGAS_BELAJAR',
  NON_AKTIF = 'NON_AKTIF',
}

export class CreatePegawaiDto {
  @ApiProperty({
    example: '198501012010011001',
    description: '18 digit NIP',
    minLength: 18,
    maxLength: 18,
  })
  @IsString()
  @MinLength(18)
  @MaxLength(18)
  nip: string;

  @ApiProperty({
    example: '1234567890123456',
    description: '16 digit NUPTK (Optional)',
    required: false,
    minLength: 16,
    maxLength: 16,
  })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nuptk?: string;

  @ApiProperty({
    example: '3601010101900001',
    description: '16 digit NIK (Optional)',
    required: false,
    minLength: 16,
    maxLength: 16,
  })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nik?: string;

  @ApiProperty({
    example: 'Ahmad Dahlan, S.Pd',
    description: 'Full name with academic titles',
  })
  @IsString()
  nama: string;

  @ApiProperty({
    example: 'Pandeglang',
    description: 'Place of birth',
    required: false,
  })
  @IsOptional()
  @IsString()
  tempatLahir?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Date of birth (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  tanggalLahir?: string;

  @ApiProperty({
    example: 'L',
    enum: Gender,
    description: 'Gender (L=Male, P=Female)',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: 'PNS',
    enum: JenisPegawai,
    description: 'Employment type',
  })
  @IsEnum(JenisPegawai)
  jenisPegawai: JenisPegawai;

  @ApiProperty({
    example: 'AKTIF',
    enum: StatusPegawai,
    description: 'Employment status',
    default: 'AKTIF',
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusPegawai)
  statusPegawai?: StatusPegawai;

  @ApiProperty({
    example: 'III/a',
    description: 'Rank/Golongan (Optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  golongan?: string;

  @ApiProperty({
    example: 'Guru Ahli Pertama',
    description: 'Official position title',
  })
  @IsString()
  jabatan: string;

  @ApiProperty({
    example: 'MTsN 1 Pandeglang',
    description: 'Work unit name',
  })
  @IsString()
  unitKerja: string;

  @ApiProperty({
    example: 'Jl. Raya Labuan Km 10 Pandeglang',
    description: 'Residential address',
    required: false,
  })
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiProperty({
    example: '081234567890',
    description: 'Mobile phone number',
    required: false,
  })
  @IsOptional()
  @IsString()
  hp?: string;

  @ApiProperty({
    example: 'ahmad.dahlan@gmail.com',
    description: 'Personal email address',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'S1 Pendidikan Matematika',
    description: 'Last education',
    required: false,
  })
  @IsOptional()
  @IsString()
  pendidikan?: string;

  @ApiProperty({
    example: 5,
    description: 'Years of service',
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  masaKerjaTahun?: number;

  @ApiProperty({
    example: 6,
    description: 'Months of service',
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  masaKerjaBulan?: number;

  @ApiProperty({
    example: 'base64_encoded_image...',
    description: 'Profile photo',
    required: false,
  })
  @IsOptional()
  @IsString()
  fotoPegawai?: string;
}

export class UpdatePegawaiDto {
  @ApiProperty({ required: false, example: '198501012010011001' })
  @IsOptional()
  @IsString()
  @MinLength(18)
  @MaxLength(18)
  nip?: string;

  @ApiProperty({ required: false, example: '1234567890123456' })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nuptk?: string;

  @ApiProperty({ required: false, example: '3601010101900001' })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  nik?: string;

  @ApiProperty({ required: false, example: 'Ahmad Dahlan' })
  @IsOptional()
  @IsString()
  nama?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tempatLahir?: string;

  @ApiProperty({ required: false, example: '1990-01-01' })
  @IsOptional()
  @IsDateString()
  tanggalLahir?: string;

  @ApiProperty({ required: false, enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ required: false, enum: JenisPegawai })
  @IsOptional()
  @IsEnum(JenisPegawai)
  jenisPegawai?: JenisPegawai;

  @ApiProperty({ required: false, enum: StatusPegawai })
  @IsOptional()
  @IsEnum(StatusPegawai)
  statusPegawai?: StatusPegawai;

  @ApiProperty({ required: false, example: 'III/a' })
  @IsOptional()
  @IsString()
  golongan?: string;

  @ApiProperty({ required: false, example: 'Guru Madya' })
  @IsOptional()
  @IsString()
  jabatan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  unitKerja?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hp?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pendidikan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  masaKerjaTahun?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  masaKerjaBulan?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fotoPegawai?: string;
}
```

---

## src/modules/audit/audit.module.ts

```typescript
import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { AuditInterceptor } from './interceptors/audit.interceptor';

@Module({
  controllers: [AuditController],
  providers: [AuditService, AuditInterceptor],
  exports: [AuditService, AuditInterceptor],
})
export class AuditModule {}
```

---

## src/modules/audit/interceptors/audit.interceptor.ts

```typescript
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
```

---

## src/modules/audit/audit.controller.ts

```typescript
import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';

@ApiTags('audit')
@Controller('audit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get all audit logs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'userId', required: false, type: String })
  @ApiQuery({ name: 'entity', required: false, type: String })
  @ApiQuery({ name: 'action', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
    @Query('entity') entity?: string,
    @Query('action') action?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.auditService.findAll(parseInt(page || '1'), parseInt(limit || '50'), {
      userId,
      entity,
      action,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
  }

  @Get('my-activity')
  @ApiOperation({ summary: 'Get current user activity logs' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getMyActivity(
    @GetUser('id') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.auditService.getUserActivity(
      userId,
      parseInt(page || '1'),
      parseInt(limit || '50'),
    );
  }

  @Get('statistics')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get audit statistics' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async getStatistics(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.auditService.getStatistics(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('entity/:entity/:entityId')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Get audit logs for specific entity' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findByEntity(
    @Param('entity') entity: string,
    @Param('entityId') entityId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.auditService.findByEntity(
      entity,
      entityId,
      parseInt(page || '1'),
      parseInt(limit || '20'),
    );
  }

  @Post('clean')
  @HttpCode(HttpStatus.OK)
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Clean old audit logs' })
  @ApiQuery({ name: 'daysToKeep', required: false, type: Number })
  async cleanOldLogs(@Query('daysToKeep') daysToKeep?: string) {
    return this.auditService.cleanOldLogs(parseInt(daysToKeep || '90'));
  }
}
```

---

## src/modules/audit/audit.service.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Log audit event
   */
  async log(data: {
    userId: string;
    action: string;
    entity: string;
    entityId?: string;
    oldData?: any;
    newData?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      const auditLog = await this.prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          entity: data.entity,
          entityId: data.entityId,
          oldData: data.oldData,
          newData: data.newData,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      });

      this.logger.log(
        `Audit: ${data.action} on ${data.entity}${data.entityId ? ` (${data.entityId})` : ''} by user ${data.userId}`,
      );

      return auditLog;
    } catch (error) {
      this.logger.error(`Failed to create audit log: ${error.message}`);
      // Don't throw error - audit logging should not break the main flow
      return null;
    }
  }

  /**
   * Get audit logs with filters
   */
  async findAll(
    page: number = 1,
    limit: number = 50,
    filters?: {
      userId?: string;
      entity?: string;
      action?: string;
      startDate?: Date;
      endDate?: Date;
    },
  ) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (filters?.userId) where.userId = filters.userId;
    if (filters?.entity) where.entity = filters.entity;
    if (filters?.action) where.action = filters.action;

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get audit logs for specific entity
   */
  async findByEntity(entity: string, entityId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: {
          entity,
          entityId,
        },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({
        where: {
          entity,
          entityId,
        },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get user activity
   */
  async getUserActivity(userId: string, page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.auditLog.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get statistics
   */
  async getStatistics(startDate?: Date, endDate?: Date) {
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [total, byAction, byEntity, byUser] = await Promise.all([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.groupBy({
        by: ['action'],
        where,
        _count: true,
        orderBy: {
          _count: {
            action: 'desc',
          },
        },
      }),
      this.prisma.auditLog.groupBy({
        by: ['entity'],
        where,
        _count: true,
        orderBy: {
          _count: {
            entity: 'desc',
          },
        },
      }),
      this.prisma.auditLog.groupBy({
        by: ['userId'],
        where,
        _count: true,
        orderBy: {
          _count: {
            userId: 'desc',
          },
        },
        take: 10,
      }),
    ]);

    return {
      total,
      byAction,
      byEntity,
      topUsers: byUser,
    };
  }

  /**
   * Clean old logs (retention policy)
   */
  async cleanOldLogs(daysToKeep: number = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const deleted = await this.prisma.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    this.logger.log(`Cleaned ${deleted.count} audit logs older than ${daysToKeep} days`);

    return {
      deleted: deleted.count,
      cutoffDate,
    };
  }
}
```

---

## src/modules/ai/ai.service.ts

```typescript
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiProvider } from './providers/gemini.provider';
import { ClaudeProvider } from './providers/claude.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { GroqProvider } from './providers/groq.provider';
import { DeepseekProvider } from './providers/deepseek.provider';
import { TogetherProvider } from './providers/together.provider';
import { GenerateReportDto } from './dto/generate-report.dto';

export interface AIResponse {
  success: boolean;
  content?: string;
  tokensUsed?: number;
  error?: string;
  model?: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private config: ConfigService,
    private geminiProvider: GeminiProvider,
    private claudeProvider: ClaudeProvider,
    private openaiProvider: OpenAIProvider,
    private groqProvider: GroqProvider,
    private deepseekProvider: DeepseekProvider,
    private togetherProvider: TogetherProvider,
  ) {}

  /**
   * Generate report using specified AI model
   */
  async generateReport(dto: GenerateReportDto): Promise<AIResponse> {
    this.logger.log(`Generating report with model: ${dto.model}`);

    const systemPrompt = this.buildSystemPrompt();
    const userPrompt = this.buildUserPrompt(dto);

    let result: AIResponse;

    try {
      switch (dto.model) {
        case 'gemini':
          result = await this.geminiProvider.generate(systemPrompt, userPrompt, dto.maxTokens);
          break;
        case 'claude':
          result = await this.claudeProvider.generate(systemPrompt, userPrompt, dto.maxTokens);
          break;
        case 'gpt':
          result = await this.openaiProvider.generate(systemPrompt, userPrompt, dto.maxTokens);
          break;
        case 'groq':
          result = await this.groqProvider.generate(systemPrompt, userPrompt, dto.maxTokens);
          break;
        case 'deepseek':
          result = await this.deepseekProvider.generate(systemPrompt, userPrompt, dto.maxTokens);
          break;
        case 'together':
          result = await this.togetherProvider.generate(systemPrompt, userPrompt, dto.maxTokens);
          break;
        default:
          throw new BadRequestException(`Model ${dto.model} tidak didukung`);
      }

      this.logger.log(`Report generated successfully. Tokens used: ${result.tokensUsed || 0}`);

      return result;
    } catch (error) {
      this.logger.error(`Failed to generate report: ${error.message}`);
      return {
        success: false,
        error: error.message || 'Gagal generate laporan',
      };
    }
  }

  /**
   * Build system prompt
   */
  private buildSystemPrompt(): string {
    return `ROLE: Anda adalah Asisten Administrasi ASN (Aparatur Sipil Negara) Profesional yang ahli dalam menyusun dokumen laporan kinerja pegawai di lingkungan instansi pemerintah Indonesia.

EXPERTISE:
- Menguasai format dan struktur laporan kinerja pegawai ASN
- Memahami terminologi dan regulasi kepegawaian Indonesia
- Mampu menyusun narasi formal sesuai kaidah bahasa Indonesia yang baik dan benar
- Mengetahui standar dokumentasi administrasi pemerintahan

BEHAVIOR:
- Selalu menggunakan Bahasa Indonesia baku dan formal
- Menyusun kalimat dengan struktur yang jelas dan sistematis
- Menggunakan istilah teknis yang tepat sesuai konteks kepegawaian
- Objektif dan profesional dalam menyampaikan informasi

OUTPUT STANDARDS:
- Format: Markdown yang rapi dan terstruktur
- Tone: Formal birokrasi Indonesia
- Style: Objektif, faktual, dan profesional
- Length: Sesuai kebutuhan, tidak bertele-tele namun lengkap`;
  }

  /**
   * Build user prompt from data
   */
  private buildUserPrompt(dto: GenerateReportDto): string {
    const { pegawai, kinerja, akademik, bulan, tahun, customInstruction } = dto;

    const namaBulan = this.getBulanName(bulan);
    const isGuru = pegawai.jabatan.toLowerCase().includes('guru');

    let konteksAkademik = '';
    if (isGuru && akademik) {
      konteksAkademik = `

KONTEKS PEMBELAJARAN:
- Mata Pelajaran: ${akademik.mapel}
- Kelas: ${akademik.kelas}
- Kurikulum: ${akademik.kurikulum}
- Jumlah Siswa: ${akademik.jumlahSiswa} siswa
- Beban Mengajar: ${akademik.jamMengajar} jam pelajaran per minggu
- Ekstrakurikuler: ${akademik.ekskul || 'Tidak ada'}
- Tahun Pelajaran: ${akademik.tahunPelajaran}
- Semester: ${akademik.semester}`;
    }

    return `TASK: Buat ISI LAPORAN KINERJA BULANAN (Tanpa Kop Surat dan Tanda Tangan)

===========================================
DATA PEGAWAI
===========================================
- Nama Lengkap: ${pegawai.nama}
- NIP: ${pegawai.nip}
- Jabatan: ${pegawai.jabatan}
- Golongan/Ruang: ${pegawai.golongan || '-'}
- Unit Kerja: ${pegawai.unitKerja}
- Jenis Kepegawaian: ${pegawai.jenisPegawai}
- Masa Kerja: ${pegawai.masaKerjaTahun || 0} tahun ${pegawai.masaKerjaBulan || 0} bulan

===========================================
PERIODE LAPORAN
===========================================
- Bulan Laporan: ${namaBulan} ${tahun}
${akademik?.tahunPelajaran ? `- Tahun Pelajaran: ${akademik.tahunPelajaran}` : ''}
${akademik?.semester ? `- Semester: ${akademik.semester}` : ''}
${konteksAkademik}

===========================================
DATA KINERJA
===========================================
Tugas Pokok:
${kinerja.tugasPokok}

Tugas Tambahan:
${kinerja.tugasTambahan || 'Tidak ada'}

Target Capaian Tahunan (IKU):
${kinerja.targetTahunan || 'Belum ditentukan'}

Hambatan/Kendala Bulan Ini:
${kinerja.hambatan || 'Tidak ada hambatan yang signifikan'}

Solusi/Tindak Lanjut:
${kinerja.solusi || 'Terus meningkatkan kualitas layanan'}

===========================================
INSTRUKSI OUTPUT
===========================================
1. JANGAN buat Kop Surat (sudah ada di sistem)
2. JANGAN buat bagian Tanda Tangan (sudah ada di sistem)
3. Format OUTPUT harus dalam MARKDOWN yang rapi
4. Gunakan Bahasa Indonesia Formal
5. PENTING: Gunakan data yang sudah diberikan, jangan tambah/kurangi
${akademik?.tahunPelajaran ? `6. Gunakan Tahun Pelajaran "${akademik.tahunPelajaran}"` : ''}

===========================================
STRUKTUR LAPORAN (WAJIB DIIKUTI)
===========================================

## BAB I: PENDAHULUAN

### 1.1 Latar Belakang
Jelaskan konteks tugas dan tanggung jawab pegawai dalam ${namaBulan} ${tahun}.

### 1.2 Tujuan Laporan
Tujuan penyusunan laporan kinerja ini.

### 1.3 Ruang Lingkup
Laporan ini mencakup pelaksanaan tugas selama bulan ${namaBulan} ${tahun}.

---

## BAB II: PELAKSANAAN TUGAS BULANAN

### 2.1 Uraian Tugas Pokok
[Jelaskan pelaksanaan tugas pokok]

### 2.2 Tugas Tambahan
[Jelaskan pelaksanaan tugas tambahan]

### 2.3 Rincian Kegiatan Harian

| No | Tanggal | Uraian Kegiatan | Output/Hasil | Keterangan |
|:--:|:-------:|-----------------|--------------|------------|
| 1 | ${tahun}-${String(bulan).padStart(2, '0')}-01 | [Kegiatan] | [Output] | [Ket] |

**PENTING:** 
- Buat minimal 15-20 baris kegiatan yang variatif
- Tanggal tersebar di sepanjang bulan
- Kegiatan relevan dengan tugas
- Output konkret dan terukur

---

## BAB III: CAPAIAN KINERJA DAN EVALUASI

### 3.1 Capaian Target
[Jelaskan capaian berdasarkan target IKU]

### 3.2 Analisis Kinerja
[Analisis objektif kinerja]

### 3.3 Hambatan dan Kendala
${kinerja.hambatan || 'Tidak ada hambatan berarti'}

### 3.4 Solusi dan Tindak Lanjut
${kinerja.solusi || 'Terus optimalisasi kinerja'}

---

## BAB IV: PENUTUP

### 4.1 Kesimpulan
[Simpulkan pelaksanaan kinerja]

### 4.2 Rekomendasi
[Rekomendasi perbaikan]

===========================================
INSTRUKSI TAMBAHAN DARI USER
===========================================
${customInstruction || 'Tidak ada instruksi tambahan'}

===========================================
QUALITY CHECKLIST
===========================================
✓ Bahasa Indonesia baku dan formal
✓ Struktur BAB I-IV lengkap
✓ Tabel kegiatan minimal 15 baris
✓ Konten relevan dengan data pegawai
✓ Output terukur dan konkret
✓ Total 1500-2500 kata

MULAI GENERATE SEKARANG!`;
  }

  /**
   * Get nama bulan Indonesia
   */
  private getBulanName(bulan: number): string {
    const namaBulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return namaBulan[bulan - 1] || '';
  }

  /**
   * Get available models
   */
  getAvailableModels(): string[] {
    const models: string[] = [];

    if (this.config.get('GEMINI_API_KEY')) models.push('gemini');
    if (this.config.get('CLAUDE_API_KEY')) models.push('claude');
    if (this.config.get('OPENAI_API_KEY')) models.push('gpt');
    if (this.config.get('GROQ_API_KEY')) models.push('groq');
    if (this.config.get('DEEPSEEK_API_KEY')) models.push('deepseek');
    if (this.config.get('TOGETHER_API_KEY')) models.push('together');

    return models;
  }

  /**
   * Check if model is available
   */
  isModelAvailable(model: string): boolean {
    return this.getAvailableModels().includes(model);
  }
}
```

---

## src/modules/ai/ai.controller.ts

```typescript
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { GenerateReportDto } from './dto/generate-report.dto';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate report using AI' })
  @ApiResponse({ status: 200, description: 'Report generated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async generateReport(@Body() dto: GenerateReportDto) {
    return this.aiService.generateReport(dto);
  }

  @Get('models')
  @ApiOperation({ summary: 'Get available AI models' })
  getAvailableModels() {
    return {
      models: this.aiService.getAvailableModels(),
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Check AI service health' })
  healthCheck() {
    return {
      status: 'ok',
      availableModels: this.aiService.getAvailableModels(),
    };
  }
}
```

---

## src/modules/ai/ai.module.ts

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { GeminiProvider } from './providers/gemini.provider';
import { ClaudeProvider } from './providers/claude.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { GroqProvider } from './providers/groq.provider';
import { DeepseekProvider } from './providers/deepseek.provider';
import { TogetherProvider } from './providers/together.provider';

@Module({
  imports: [ConfigModule],
  controllers: [AiController],
  providers: [
    AiService,
    GeminiProvider,
    ClaudeProvider,
    OpenAIProvider,
    GroqProvider,
    DeepseekProvider,
    TogetherProvider,
  ],
  exports: [AiService],
})
export class AiModule {}
```

---

## src/modules/ai/dto/generate-report.dto.ts

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class PegawaiDataDto {
  @ApiProperty()
  @IsString()
  nama: string;

  @ApiProperty()
  @IsString()
  nip: string;

  @ApiProperty()
  @IsString()
  jabatan: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  golongan?: string;

  @ApiProperty()
  @IsString()
  unitKerja: string;

  @ApiProperty()
  @IsString()
  jenisPegawai: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  masaKerjaTahun?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  masaKerjaBulan?: number;
}

class AkademikDataDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  kurikulum?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tahunPelajaran?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  semester?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mapel?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  kelas?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  jamMengajar?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  jumlahSiswa?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ekskul?: string;
}

class KinerjaDataDto {
  @ApiProperty()
  @IsString()
  tugasPokok: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tugasTambahan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  targetTahunan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hambatan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  solusi?: string;
}

export class GenerateReportDto {
  @ApiProperty({
    example: 'gemini',
    enum: ['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'],
    description: 'AI model to use for generation',
  })
  @IsEnum(['gemini', 'claude', 'gpt', 'groq', 'deepseek', 'together'])
  model: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 12 })
  @IsNumber()
  @Min(1)
  @Max(12)
  bulan: number;

  @ApiProperty({ example: 2025 })
  @IsNumber()
  tahun: number;

  @ApiProperty({ type: PegawaiDataDto })
  @ValidateNested()
  @Type(() => PegawaiDataDto)
  pegawai: PegawaiDataDto;

  @ApiProperty({ type: KinerjaDataDto })
  @ValidateNested()
  @Type(() => KinerjaDataDto)
  kinerja: KinerjaDataDto;

  @ApiProperty({ type: AkademikDataDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AkademikDataDto)
  akademik?: AkademikDataDto;

  @ApiProperty({ example: 2000, default: 2000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(500)
  @Max(8000)
  maxTokens?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  customInstruction?: string;
}
```

---

## src/modules/ai/providers/groq.provider.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class GroqProvider implements AIProviderInterface {
  private readonly logger = new Logger(GroqProvider.name);
  private readonly apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('GROQ_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Groq API key not configured',
      };
    }

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          max_tokens: maxTokens,
          temperature: 0.7,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const text = response.data.choices[0].message.content;
      const tokensUsed = response.data.usage.total_tokens;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'llama-3.3-70b-versatile',
      };
    } catch (error) {
      this.logger.error(`Groq generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message || error.message || 'Failed to generate with Groq',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
```

---

## src/modules/ai/providers/deepseek.provider.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class DeepseekProvider implements AIProviderInterface {
  private readonly logger = new Logger(DeepseekProvider.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://api.deepseek.com/chat/completions';

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('DEEPSEEK_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'DeepSeek API key not configured',
      };
    }

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const text = response.data.choices[0].message.content;
      const tokensUsed = response.data.usage.total_tokens;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'deepseek-chat',
      };
    } catch (error) {
      this.logger.error(`DeepSeek generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message ||
          error.message ||
          'Failed to generate with DeepSeek',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
```

---

## src/modules/ai/providers/together.provider.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class TogetherProvider implements AIProviderInterface {
  private readonly logger = new Logger(TogetherProvider.name);
  private readonly apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('TOGETHER_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Together AI API key not configured',
      };
    }

    try {
      const response = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: 'meta-llama/Llama-3-70b-chat-hf', // Atau model lain yang tersedia di Together
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: maxTokens,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const text = response.data.choices[0].message.content;
      const tokensUsed = response.data.usage?.total_tokens || 0;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'together-llama-3-70b',
      };
    } catch (error) {
      this.logger.error(`Together AI generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message ||
          error.message ||
          'Failed to generate with Together AI',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
```

---

## src/modules/ai/providers/openai.provider.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider implements AIProviderInterface {
  private readonly logger = new Logger(OpenAIProvider.name);
  private readonly apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('OPENAI_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'OpenAI API key not configured',
      };
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          max_tokens: maxTokens,
          temperature: 0.7,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      const text = response.data.choices[0].message.content;
      const tokensUsed = response.data.usage.total_tokens;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'gpt-4o-mini',
      };
    } catch (error) {
      this.logger.error(`OpenAI generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message || error.message || 'Failed to generate with OpenAI',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
```

---

## src/modules/ai/providers/gemini.provider.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class GeminiProvider implements AIProviderInterface {
  private readonly logger = new Logger(GeminiProvider.name);
  private readonly apiKey: string;
  private readonly genAI: GoogleGenerativeAI;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('GEMINI_API_KEY') || '';
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
    }
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Gemini API key not configured',
      };
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: maxTokens,
        },
      });

      const response = result.response;
      let text = response.text();

      // Clean markdown artifacts
      text = text
        .replace(/^```markdown\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      return {
        success: true,
        content: text,
        tokensUsed: response.usageMetadata?.totalTokenCount || 0,
        model: 'gemini-2.5-flash',
      };
    } catch (error) {
      this.logger.error(`Gemini generation failed: ${error.message}`);
      return {
        success: false,
        error: error.message || 'Failed to generate with Gemini',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
```

---

## src/modules/ai/providers/claude.provider.ts

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AIProviderInterface, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class ClaudeProvider implements AIProviderInterface {
  private readonly logger = new Logger(ClaudeProvider.name);
  private readonly apiKey: string;

  constructor(private config: ConfigService) {
    this.apiKey = this.config.get('CLAUDE_API_KEY') || '';
  }

  async generate(
    systemPrompt: string,
    userPrompt: string,
    maxTokens: number = 2000,
  ): Promise<AIResponse> {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: 'Claude API key not configured',
      };
    }

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-sonnet-4-20250514',
          max_tokens: maxTokens,
          temperature: 0.7,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: userPrompt,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
          },
        },
      );

      const text = response.data.content[0].text;
      const tokensUsed = response.data.usage.input_tokens + response.data.usage.output_tokens;

      return {
        success: true,
        content: text,
        tokensUsed,
        model: 'claude-sonnet-4-20250514',
      };
    } catch (error) {
      this.logger.error(`Claude generation failed: ${error.message}`);
      return {
        success: false,
        error:
          error.response?.data?.error?.message || error.message || 'Failed to generate with Claude',
      };
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }
}
```

---

## src/modules/ai/interfaces/ai-provider.interface.ts

```typescript
export interface AIProviderInterface {
  generate(systemPrompt: string, userPrompt: string, maxTokens?: number): Promise<AIResponse>;
  isAvailable(): boolean;
}

export interface AIResponse {
  success: boolean;
  content?: string;
  tokensUsed?: number;
  error?: string;
  model?: string;
}
```

---

## src/config/redis.config.ts

```typescript
import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
  keyPrefix: process.env.QUEUE_PREFIX || 'ekinerja:',
}));
```

---

## src/config/database.config.ts

```typescript
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'ekinerja',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
}));
```

---

## src/config/jwt.config.ts

```typescript
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
}));
```

---

## src/common/prisma/prisma.module.ts

```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

## src/common/prisma/prisma.service.ts

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
      errorFormat: 'pretty',
    });

    // Log queries in development
    if (process.env.NODE_ENV === 'development') {
      this.$on('query' as never, (e: any) => {
        this.logger.debug(`Query: ${e.query}`);
        this.logger.debug(`Params: ${e.params}`);
        this.logger.debug(`Duration: ${e.duration}ms`);
      });
    }

    this.$on('error' as never, (e: any) => {
      this.logger.error(`Prisma Error: ${e.message}`);
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Database connected successfully');
    } catch (error) {
      this.logger.error('❌ Database connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }

  /**
   * Clean database (for testing purposes)
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production!');
    }

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }

  /**
   * Soft delete helper
   */
  async softDelete(model: string, where: any) {
    return this[model].update({
      where,
      data: { deletedAt: new Date() },
    });
  }
}
```

---

## src/utils/validators.ts

```typescript
// ============================================================================
// VALIDATION UTILITIES
// Version: 1.0.0
// ============================================================================

import { VALIDATION_RULES } from './constants';

/**
 * Validate NIP
 */
export const isValidNIP = (nip: string): boolean => {
  if (!nip) return false;
  const cleaned = nip.replace(/\D/g, '');
  return VALIDATION_RULES.nip.regex.test(cleaned);
};

/**
 * Validate NUPTK
 */
export const isValidNUPTK = (nuptk: string): boolean => {
  if (!nuptk) return false;
  const cleaned = nuptk.replace(/\D/g, '');
  return VALIDATION_RULES.nuptk.regex.test(cleaned);
};

/**
 * Validate NIK
 */
export const isValidNIK = (nik: string): boolean => {
  if (!nik) return false;
  const cleaned = nik.replace(/\D/g, '');
  return VALIDATION_RULES.nik.regex.test(cleaned);
};

/**
 * Validate Email
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  return VALIDATION_RULES.email.regex.test(email);
};

/**
 * Validate Phone
 */
export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return VALIDATION_RULES.phone.regex.test(cleaned);
};

/**
 * Validate date range
 */
export const isValidDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate <= endDate;
};

/**
 * Validate bulan (1-12)
 */
export const isValidBulan = (bulan: number): boolean => {
  return bulan >= 1 && bulan <= 12;
};

/**
 * Validate tahun
 */
export const isValidTahun = (tahun: number): boolean => {
  const currentYear = new Date().getFullYear();
  return tahun >= 2000 && tahun <= currentYear + 1;
};

/**
 * Validate file type
 */
export const isValidFileType = (mimetype: string, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(mimetype);
};

/**
 * Validate file size
 */
export const isValidFileSize = (size: number, maxSize: number): boolean => {
  return size <= maxSize;
};

/**
 * Sanitize string input
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validate required fields
 */
export const validateRequiredFields = (
  data: Record<string, any>,
  requiredFields: string[],
): { valid: boolean; missing: string[] } => {
  const missing: string[] = [];

  for (const field of requiredFields) {
    if (!data[field] || data[field] === '') {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
};
```

---

## src/utils/helpers.ts

```typescript
// ============================================================================
// HELPER UTILITIES
// Version: 1.0.0
// ============================================================================

import { BULAN_INDONESIA } from './constants';

/**
 * Format tanggal ke Indonesia
 */
export const formatDateIndonesia = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const day = d.getDate();
  const month = BULAN_INDONESIA[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Get nama bulan Indonesia
 */
export const getBulanIndonesia = (bulan: number): string => {
  return BULAN_INDONESIA[bulan - 1] || '';
};

/**
 * Generate nomor dokumen
 */
export const generateNomorDokumen = (bulan: number, tahun: number, urutan: number): string => {
  const nomorUrut = String(urutan).padStart(3, '0');
  const bulanStr = String(bulan).padStart(2, '0');
  return `${nomorUrut}/LPKP/${bulanStr}/${tahun}`;
};

/**
 * Sanitize filename
 */
export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9_\-\.]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};

/**
 * Generate hash sederhana
 */
export const generateSimpleHash = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

/**
 * Sleep delay
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Remove HTML tags
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Truncate text
 */
export const truncate = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Check if string is valid JSON
 */
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
```

---

## src/utils/constants.ts

```typescript
// ============================================================================
// CONSTANTS & CONFIGURATIONS
// Version: 1.0.0
// ============================================================================

export const APP_INFO = {
  name: 'E-Kinerja Backend API',
  version: '1.0.0',
  description: 'Backend API untuk Generator Laporan Kinerja Pegawai',
  author: 'Yahya Zulfikri',
};

export const VALIDATION_RULES = {
  nip: {
    length: 18,
    regex: /^\d{18}$/,
    message: 'NIP harus 18 digit angka',
  },
  nuptk: {
    length: 16,
    regex: /^\d{16}$/,
    message: 'NUPTK harus 16 digit angka',
  },
  nik: {
    length: 16,
    regex: /^\d{16}$/,
    message: 'NIK harus 16 digit angka',
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Format email tidak valid',
  },
  phone: {
    regex: /^(\+62|62|0)[0-9]{9,12}$/,
    message: 'Nomor telepon tidak valid',
  },
};

export const FILE_LIMITS = {
  image: {
    maxSize: 500 * 1024, // 500KB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword'],
  },
};

export const BULAN_INDONESIA = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const JENIS_PEGAWAI = ['PNS', 'PPPK', 'HONORER', 'GTT', 'PTT', 'GURU'];

export const STATUS_PEGAWAI = ['AKTIF', 'CUTI', 'TUGAS_BELAJAR', 'NON_AKTIF'];

export const REPORT_STATUS = ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'ARCHIVED'];

export const AI_MODELS = {
  gemini: {
    name: 'Google Gemini 2.0 Flash',
    maxTokens: 8000,
    temperature: 0.7,
  },
  claude: {
    name: 'Claude Sonnet 4',
    maxTokens: 4000,
    temperature: 0.7,
  },
  gpt: {
    name: 'GPT-4o Mini',
    maxTokens: 4000,
    temperature: 0.7,
  },
  groq: {
    name: 'Groq Llama 3.3 70B',
    maxTokens: 8000,
    temperature: 0.7,
  },
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email atau password salah',
  UNAUTHORIZED: 'Anda tidak memiliki akses',
  NOT_FOUND: 'Data tidak ditemukan',
  ALREADY_EXISTS: 'Data sudah ada',
  VALIDATION_ERROR: 'Validasi gagal',
  SERVER_ERROR: 'Terjadi kesalahan server',
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Data berhasil dibuat',
  UPDATED: 'Data berhasil diupdate',
  DELETED: 'Data berhasil dihapus',
  LOGGED_IN: 'Login berhasil',
  LOGGED_OUT: 'Logout berhasil',
};
```

---

## src/main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { AuditInterceptor } from './modules/audit/interceptors/audit.interceptor';
import { Reflector } from '@nestjs/core';
import { AuditService } from './modules/audit/audit.service';

async function bootstrap() {
  // Winston Logger
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message, context }) => {
            return `${timestamp} [${context}] ${level}: ${message}`;
          }),
        ),
      }),
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const auditService = app.get(AuditService);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new AuditInterceptor(auditService, reflector));

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')?.split(',') || '*',
    credentials: configService.get('CORS_CREDENTIALS') === 'true',
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger
  if (configService.get('ENABLE_SWAGGER') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('E-Kinerja Backend API')
      .setDescription('API Documentation untuk Generator Laporan Kinerja Pegawai')
      .setVersion('1.0')
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management')
      .addTag('pegawai', 'Employee data management')
      .addTag('reports', 'Report generation and management')
      .addTag('ai', 'AI services')
      .addTag('files', 'File upload and management')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  // Sentry (Error Monitoring)
  const sentryDsn = configService.get('SENTRY_DSN');
  if (sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      environment: configService.get('NODE_ENV'),
      tracesSampleRate: 1.0,
    });
  }

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}/api`, 'Bootstrap');
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`, 'Bootstrap');
}

bootstrap();
```

---

## src/app.module.ts

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { BullModule } from '@nestjs/bullmq';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PegawaiModule } from './modules/pegawai/pegawai.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AiModule } from './modules/ai/ai.module';
import { FilesModule } from './modules/files/files.module';
import { InstansiModule } from './modules/instansi/instansi.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditModule } from './modules/audit/audit.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Logger
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            level: config.get('LOG_LEVEL') || 'info',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.colorize(),
              winston.format.printf(({ timestamp, level, message, context }) => {
                return `${timestamp} [${context}] ${level}: ${message}`;
              }),
            ),
          }),
          new winston.transports.File({
            filename: `${config.get('LOG_FILE_PATH') || './logs'}/error.log`,
            level: 'error',
          }),
          new winston.transports.File({
            filename: `${config.get('LOG_FILE_PATH') || './logs'}/combined.log`,
          }),
        ],
      }),
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: parseInt(config.get('RATE_LIMIT_TTL') || '60', 10) * 1000,
            limit: parseInt(config.get('RATE_LIMIT_MAX') || '100', 10),
          },
        ],
      }),
    }),

    // BullMQ (Queue)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST') || 'localhost',
          port: parseInt(config.get('REDIS_PORT') || '6379', 10),
          password: config.get('REDIS_PASSWORD'),
          db: parseInt(config.get('REDIS_DB') || '0', 10),
        },
        prefix: config.get('QUEUE_PREFIX') || 'ekinerja',
      }),
    }),

    // Database
    PrismaModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    PegawaiModule,
    ReportsModule,
    AiModule,
    FilesModule,
    InstansiModule,
    NotificationsModule,
    AuditModule,
    HealthModule,
  ],
})
export class AppModule {}
```

---

## prisma/schema.prisma

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  password     String
  name         String
  role         UserRole  @default(USER)
  isActive     Boolean   @default(true)
  lastLogin    DateTime?
  refreshToken String?   @db.Text
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  
  // Relations
  pegawai      Pegawai?
  reports      Report[]
  auditLogs    AuditLog[]
  
  @@index([email])
  @@map("users")
}

enum UserRole {
  SUPER_ADMIN
  ADMIN
  USER
  GUEST
}

// ============================================================================
// PEGAWAI (EMPLOYEE)
// ============================================================================

model Pegawai {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Identitas
  nip             String   @unique
  nuptk           String?  @unique
  nik             String?  @unique
  nama            String
  tempatLahir     String?
  tanggalLahir    DateTime?
  gender          Gender
  
  // Kepegawaian
  jenisPegawai    JenisPegawai
  statusPegawai   StatusPegawai @default(AKTIF)
  golongan        String?
  jabatan         String
  unitKerja       String
  
  // Kontak
  alamat          String?  @db.Text
  hp              String?
  email           String?
  
  // Akademik
  pendidikan      String?
  masaKerjaTahun  Int      @default(0)
  masaKerjaBulan  Int      @default(0)
  
  // Media
  fotoPegawai     String?  @db.Text
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  reports         Report[]
  akademik        AkademikData?
  
  @@index([nip])
  @@index([nama])
  @@map("pegawai")
}

enum Gender {
  L
  P
}

enum JenisPegawai {
  PNS
  PPPK
  HONORER
  GTT
  PTT
  GURU
}

enum StatusPegawai {
  AKTIF
  CUTI
  TUGAS_BELAJAR
  NON_AKTIF
}

// ============================================================================
// AKADEMIK DATA (Khusus Guru)
// ============================================================================

model AkademikData {
  id              String   @id @default(uuid())
  pegawaiId       String   @unique
  pegawai         Pegawai  @relation(fields: [pegawaiId], references: [id], onDelete: Cascade)
  
  kurikulum       Kurikulum
  tahunPelajaran  String
  semester        Semester
  mapel           String
  kelas           String
  jamMengajar     Int
  jumlahSiswa     Int
  ekskul          String?  @db.Text
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@map("akademik_data")
}

enum Kurikulum {
  K13
  MERDEKA
  KTSP
}

enum Semester {
  GANJIL
  GENAP
}

// ============================================================================
// INSTANSI (ORGANIZATION)
// ============================================================================

model Instansi {
  id          String   @id @default(uuid())
  
  // Header Info
  header1     String
  header2     String
  header3     String
  alamat      String   @db.Text
  telepon     String?
  email       String?
  website     String?
  
  // Logo
  logoUtama   String?  @db.Text
  logoInstansi String? @db.Text
  
  // Pejabat
  namaKepala  String
  nipKepala   String
  pangkatKepala String
  ttdKepala   String?  @db.Text
  
  titimangsa  String
  
  isActive    Boolean  @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  reports     Report[]
  
  @@map("instansi")
}

// ============================================================================
// REPORT (LAPORAN KINERJA)
// ============================================================================

model Report {
  id              String      @id @default(uuid())
  
  // Relations
  pegawaiId       String
  pegawai         Pegawai     @relation(fields: [pegawaiId], references: [id], onDelete: Cascade)
  
  instansiId      String
  instansi        Instansi    @relation(fields: [instansiId], references: [id])
  
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  
  // Periode
  bulan           Int
  tahun           Int
  
  // Kinerja Data
  tugasPokok      String      @db.Text
  tugasTambahan   String?     @db.Text
  targetTahunan   String?     @db.Text
  hambatan        String?     @db.Text
  solusi          String?     @db.Text
  
  // AI Generated Content
  content         String      @db.LongText
  modelAI         String
  tokensUsed      Int?
  
  // TTE (Tanda Tangan Elektronik)
  nomorDokumen    String      @unique
  hashDokumen     String?
  qrCode          String?     @db.Text
  ttdTimestamp    DateTime?
  
  // Status
  status          ReportStatus @default(DRAFT)
  publishedAt     DateTime?
  
  // Metadata
  metadata        Json?
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  @@index([pegawaiId])
  @@index([userId])
  @@index([bulan, tahun])
  @@index([nomorDokumen])
  @@index([status])
  @@map("reports")
}

enum ReportStatus {
  DRAFT
  SUBMITTED
  APPROVED
  REJECTED
  ARCHIVED
}

// ============================================================================
// FILE UPLOAD
// ============================================================================

model FileUpload {
  id          String      @id @default(uuid())
  
  filename    String
  originalName String
  mimetype    String
  size        Int
  path        String
  url         String?
  
  uploadedBy  String
  category    FileCategory
  
  metadata    Json?
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  @@index([uploadedBy])
  @@index([category])
  @@map("file_uploads")
}

enum FileCategory {
  FOTO_PEGAWAI
  LOGO_INSTANSI
  TTD
  LAMPIRAN
  DOKUMEN
  OTHER
}

// ============================================================================
// AUDIT LOG
// ============================================================================

model AuditLog {
  id          String      @id @default(uuid())
  
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  
  action      String
  entity      String
  entityId    String?
  
  oldData     Json?
  newData     Json?
  
  ipAddress   String?
  userAgent   String?
  
  createdAt   DateTime    @default(now())
  
  @@index([userId])
  @@index([entity])
  @@index([createdAt])
  @@map("audit_logs")
}

// ============================================================================
// NOTIFICATION
// ============================================================================

model Notification {
  id          String      @id @default(uuid())
  
  userId      String
  
  title       String
  message     String      @db.Text
  type        NotificationType
  
  isRead      Boolean     @default(false)
  readAt      DateTime?
  
  metadata    Json?
  
  createdAt   DateTime    @default(now())
  
  @@index([userId])
  @@index([isRead])
  @@map("notifications")
}

enum NotificationType {
  INFO
  SUCCESS
  WARNING
  ERROR
  REPORT_SUBMITTED
  REPORT_APPROVED
  REPORT_REJECTED
}

// ============================================================================
// SETTINGS
// ============================================================================

model Setting {
  id          String      @id @default(uuid())
  
  key         String      @unique
  value       String      @db.Text
  category    String
  description String?
  
  isPublic    Boolean     @default(false)
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  @@index([key])
  @@index([category])
  @@map("settings")
}
```

---

## prisma/seed.ts

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@ekinerja.com' },
    update: {},
    create: {
      email: 'superadmin@ekinerja.com',
      password: hashedPassword,
      name: 'Super Administrator',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Super Admin created:', superAdmin.email);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ekinerja.com' },
    update: {},
    create: {
      email: 'admin@ekinerja.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin created:', admin.email);

  // Create Demo User
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ekinerja.com' },
    update: {},
    create: {
      email: 'demo@ekinerja.com',
      password: hashedPassword,
      name: 'Demo User',
      role: 'USER',
      isActive: true,
    },
  });

  console.log('✅ Demo User created:', demoUser.email);

  // Create Demo Instansi
  const instansi = await prisma.instansi.upsert({
    where: { id: '1' },
    update: {},
    create: {
      header1: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA',
      header2: 'KANTOR KABUPATEN PANDEGLANG',
      header3: 'MADRASAH TSANAWIYAH NEGERI 1 PANDEGLANG',
      alamat: 'Jl. Raya Labuan Km. 5,7 Pandeglang - Banten 42253',
      telepon: '(0253) 201000',
      email: 'mtsn1pandeglang@kemenag.go.id',
      website: 'https://mtsn1pandeglang.sch.id',
      namaKepala: 'Dr. H. Fulan bin Fulan, M.Pd',
      nipKepala: '196501011990031001',
      pangkatKepala: 'Pembina/IV-a',
      titimangsa: 'Pandeglang',
      isActive: true,
    },
  });

  console.log('✅ Demo Instansi created:', instansi.header3);

  // Create Demo Pegawai
  const pegawai = await prisma.pegawai.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      nip: '198501012010011001',
      nuptk: '1234567890123456',
      nama: 'Ahmad Dahlan, S.Pd',
      tempatLahir: 'Pandeglang',
      tanggalLahir: new Date('1990-01-01'),
      gender: 'L',
      jenisPegawai: 'PNS',
      statusPegawai: 'AKTIF',
      golongan: 'III/a',
      jabatan: 'Guru Ahli Pertama',
      unitKerja: 'MTsN 1 Pandeglang',
      pendidikan: 'S1 Pendidikan Matematika',
      masaKerjaTahun: 5,
      masaKerjaBulan: 6,
    },
  });

  console.log('✅ Demo Pegawai created:', pegawai.nama);

  // Create Demo Akademik Data
  const akademik = await prisma.akademikData.upsert({
    where: { pegawaiId: pegawai.id },
    update: {},
    create: {
      pegawaiId: pegawai.id,
      kurikulum: 'MERDEKA',
      tahunPelajaran: '2024/2025',
      semester: 'GANJIL',
      mapel: 'Matematika',
      kelas: 'VII-A, VII-B',
      jamMengajar: 24,
      jumlahSiswa: 64,
      ekskul: 'Olimpiade Matematika',
    },
  });

  console.log('✅ Demo Akademik Data created');

  console.log('\n🎉 Seeding completed!\n');
  console.log('📝 Login credentials:');
  console.log('   Super Admin: superadmin@ekinerja.com / admin123');
  console.log('   Admin: admin@ekinerja.com / admin123');
  console.log('   Demo User: demo@ekinerja.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## .env

```env
# Application
NODE_ENV=test
PORT=3000
APP_NAME=E-Kinerja Backend API
API_VERSION=v1

# Database
DATABASE_URL="mysql://root:18012000@localhost:3306/ekinerja"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_REFRESH_EXPIRES_IN=30d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# BullMQ
QUEUE_PREFIX=ekinerja

# AI Services
GEMINI_API_KEY=AIzaSyB4_SruQBW1ODEZBzjcffMiEYOnG7vv14s
CLAUDE_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=
TOGETHER_API_KEY=
DEEPSEEK_API_KEY=

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DEST=./uploads

# CORS
CORS_ORIGIN=http://localhost:4321,http://localhost:3000
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Sentry (Optional)
SENTRY_DSN=

# Logging
LOG_LEVEL=debug
LOG_FILE_PATH=./logs

# Email (Optional - untuk notifikasi)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@ekinerja.com

# Frontend URL (untuk CORS & Email Links)
FRONTEND_URL=http://localhost:4321

# Feature Flags
ENABLE_SWAGGER=true
ENABLE_WEBSOCKET=true
ENABLE_QUEUE=true
ENABLE_RATE_LIMIT=true
```

---

## .eslintrc.js

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
```

---

## nest-cli.json

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "webpack": true,
    "tsConfigPath": "tsconfig.json"
  }
}
```

---

## .prettierrc

```
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true,
  "endOfLine": "auto"
}
```

---


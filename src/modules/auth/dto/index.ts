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

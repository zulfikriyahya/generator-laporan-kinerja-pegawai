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

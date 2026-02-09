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

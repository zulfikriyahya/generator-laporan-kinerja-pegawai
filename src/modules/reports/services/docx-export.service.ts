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

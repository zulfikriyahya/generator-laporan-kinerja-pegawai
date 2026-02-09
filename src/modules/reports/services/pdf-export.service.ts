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

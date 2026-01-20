// ============================================================================
// GENERATOR LAPORAN KINERJA PEGAWAI - EXPORT SERVICE
// Version: 1.0.0
// Supports: PDF, DOCX, Print
// ============================================================================

import type { ExportResult, AppStore } from "../types/ReportTypes";
import { reportStore, getFormattedTitimangsa } from "../stores/reportStore";

// ============================================================================
// PDF EXPORT with jsPDF and html2canvas
// ============================================================================

/**
 * Export dokumen ke PDF
 */
export const exportToPDF = async (): Promise<ExportResult> => {
  try {
    const element = document.getElementById("document-preview");
    if (!element) {
      throw new Error("Element document-preview tidak ditemukan");
    }

    // Dynamic import untuk mengurangi bundle size
    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: [1.5, 2, 1.5, 2], // [top, right, bottom, left] in cm
      filename: generatePDFFilename(),
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "cm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
        before: ".page-break-before",
        after: ".page-break-after",
        avoid: [".no-break", "tr", "table"],
      },
    };

    const pdf = await html2pdf().set(opt).from(element).save();

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("PDF Export Error:", error);
    return {
      success: false,
      error: error.message || "Gagal export PDF",
    };
  }
};

/**
 * Generate PDF Blob (untuk upload atau preview)
 */
export const generatePDFBlob = async (): Promise<ExportResult> => {
  try {
    const element = document.getElementById("document-preview");
    if (!element) {
      throw new Error("Element document-preview tidak ditemukan");
    }

    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: [1.5, 2, 1.5, 2],
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };

    const pdfBlob = await html2pdf().set(opt).from(element).outputPdf("blob");

    return {
      success: true,
      file: pdfBlob,
    };
  } catch (error: any) {
    console.error("PDF Blob Generation Error:", error);
    return {
      success: false,
      error: error.message || "Gagal generate PDF blob",
    };
  }
};

// ============================================================================
// DOCX EXPORT with docx library
// ============================================================================

/**
 * Export dokumen ke DOCX
 */
export const exportToDOCX = async (): Promise<ExportResult> => {
  try {
    const store = reportStore.get();

    // Dynamic import
    const {
      Document,
      Packer,
      Paragraph,
      TextRun,
      Table,
      TableRow,
      TableCell,
      AlignmentType,
      HeadingLevel,
      WidthType,
      BorderStyle,
    } = await import("docx");
    const { saveAs } = await import("file-saver");

    // Parse content markdown ke paragraphs
    const doc = await buildDocxDocument(store);

    // Generate blob
    const blob = await Packer.toBlob(doc);

    // Save file
    saveAs(blob, generateDOCXFilename());

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("DOCX Export Error:", error);
    return {
      success: false,
      error: error.message || "Gagal export DOCX",
    };
  }
};

/**
 * Build DOCX Document dari store data
 */
const buildDocxDocument = async (store: AppStore): Promise<any> => {
  const { Document, Paragraph, TextRun, AlignmentType, HeadingLevel } =
    await import("docx");

  const content = store.output.content;
  const lines = content.split("\n");

  const children: any[] = [];

  // Header (Kop Surat) - akan ditambahkan manual di sini
  children.push(
    new Paragraph({
      text: store.instansi.header1,
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      text: store.instansi.header2,
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_2,
    }),
    new Paragraph({
      text: store.instansi.header3,
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_2,
    }),
    new Paragraph({
      text: store.instansi.alamat,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      text: "━".repeat(60),
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({ text: "" }), // Spacing
  );

  // Judul Laporan
  children.push(
    new Paragraph({
      text: "LAPORAN KINERJA PEGAWAI",
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      text: `Periode: ${getBulanName(parseInt(store.config.bulan))} ${store.config.tahun}`,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({ text: "" }), // Spacing
  );

  // Parse markdown content (simplified)
  for (const line of lines) {
    if (line.startsWith("## ")) {
      children.push(
        new Paragraph({
          text: line.replace("## ", ""),
          heading: HeadingLevel.HEADING_1,
        }),
      );
    } else if (line.startsWith("### ")) {
      children.push(
        new Paragraph({
          text: line.replace("### ", ""),
          heading: HeadingLevel.HEADING_2,
        }),
      );
    } else if (line.trim() !== "") {
      children.push(new Paragraph({ text: line }));
    } else {
      children.push(new Paragraph({ text: "" }));
    }
  }

  // Footer (Tanda Tangan)
  children.push(
    new Paragraph({ text: "" }),
    new Paragraph({ text: "" }),
    new Paragraph({
      text: getFormattedTitimangsa(),
      alignment: AlignmentType.RIGHT,
    }),
    new Paragraph({
      text: "Pejabat Penilai,",
      alignment: AlignmentType.RIGHT,
    }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "" }),
    new Paragraph({
      text: store.instansi.kepala.nama,
      alignment: AlignmentType.RIGHT,
    }),
    new Paragraph({
      text: `NIP. ${store.instansi.kepala.nip}`,
      alignment: AlignmentType.RIGHT,
    }),
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  });

  return doc;
};

// ============================================================================
// PRINT FUNCTIONALITY
// ============================================================================

/**
 * Print dokumen
 */
export const printDocument = (): void => {
  window.print();
};

// ============================================================================
// FILENAME GENERATORS
// ============================================================================

/**
 * Generate filename untuk PDF
 */
const generatePDFFilename = (): string => {
  const store = reportStore.get();
  const nama = sanitizeFilename(store.pegawai.nama || "Pegawai");
  const bulan = store.config.bulan.padStart(2, "0");
  const tahun = store.config.tahun;

  return `Laporan_Kinerja_${nama}_${bulan}_${tahun}.pdf`;
};

/**
 * Generate filename untuk DOCX
 */
const generateDOCXFilename = (): string => {
  const store = reportStore.get();
  const nama = sanitizeFilename(store.pegawai.nama || "Pegawai");
  const bulan = store.config.bulan.padStart(2, "0");
  const tahun = store.config.tahun;

  return `Laporan_Kinerja_${nama}_${bulan}_${tahun}.docx`;
};

/**
 * Sanitize filename - remove invalid characters
 */
const sanitizeFilename = (name: string): string => {
  return name
    .replace(/[^a-zA-Z0-9_\-]/g, "_")
    .replace(/_+/g, "_")
    .substring(0, 50);
};

/**
 * Get nama bulan Indonesia
 */
const getBulanName = (bulan: number): string => {
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return namaBulan[bulan - 1] || "";
};

// ============================================================================
// UPLOAD TO GOOGLE DRIVE (Future Feature)
// ============================================================================

/**
 * Upload PDF ke Google Drive
 * TODO: Implement Google Drive API integration
 */
export const uploadToGoogleDrive = async (
  blob: Blob,
): Promise<ExportResult> => {
  // Placeholder untuk future implementation
  return {
    success: false,
    error: "Fitur ini akan tersedia di versi mendatang",
  };
};

/**
 * Generate shareable link
 * TODO: Implement link generation after upload
 */
export const generateShareableLink = async (): Promise<string> => {
  // Placeholder untuk future implementation
  return "";
};

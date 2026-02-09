import { reportStore } from "../stores/reportStore";
import { sanitizeFilename } from "../utils/helpers";

export const exportToPDF = async () => {
  try {
    const element = document.getElementById("document-preview");
    if (!element) throw new Error("Preview not found");

    const html2pdf = (await import("html2pdf.js")).default;
    const store = reportStore.get();

    const opt = {
      margin: [1.5, 2, 1.5, 2],
      filename: `Laporan_${sanitizeFilename(store.pegawai.nama)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
    };

    await html2pdf().set(opt).from(element).save();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const exportToDOCX = async () => {
  try {
    const store = reportStore.get();
    const { Document, Packer, Paragraph, TextRun } = await import("docx");
    const { saveAs } = await import("file-saver");

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ children: [new TextRun(store.instansi.header1)] }),
            new Paragraph({ text: store.output.content }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Laporan_${sanitizeFilename(store.pegawai.nama)}.docx`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const printDocument = () => {
  window.print();
};

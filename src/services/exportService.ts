import { reportStore } from "../stores/reportStore";
import { sanitizeFilename } from "../utils/helpers";

export const exportToPDF = async () => {
  try {
    const element = document.getElementById("document-preview");
    if (!element) throw new Error("Preview not found");

    const html2pdf = (await import("html2pdf.js")).default;
    const store = reportStore.get();
    const filename = `Laporan_${store.config.bulan}_${store.config.tahun}_${sanitizeFilename(store.pegawai.nama)}.pdf`;

    const opt = {
      margin: [1.5, 2, 1.5, 2],
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(element).save();
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export const exportToDOCX = async () => {
  try {
    const store = reportStore.get();
    const {
      Document,
      Packer,
      Paragraph,
      TextRun,
      AlignmentType,
      HeadingLevel,
    } = await import("docx");
    const { saveAs } = await import("file-saver");

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: store.instansi.header1,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: store.instansi.header2,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: store.instansi.header3,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: store.instansi.alamat,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "LAPORAN KINERJA PEGAWAI",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: `Periode: ${store.config.bulan}/${store.config.tahun}`,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({ text: "" }),
            ...store.output.content
              .split("\n")
              .map((line) => new Paragraph({ text: line })),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: `${store.instansi.titimangsa}, ${new Date().toLocaleDateString("id-ID")}`,
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
              bold: true,
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: "NIP. " + store.instansi.kepala.nip,
              alignment: AlignmentType.RIGHT,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const filename = `Laporan_${store.config.bulan}_${store.config.tahun}_${sanitizeFilename(store.pegawai.nama)}.docx`;
    saveAs(blob, filename);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const printDocument = () => {
  window.print();
};

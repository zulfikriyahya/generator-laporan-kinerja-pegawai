import { reportStore } from "../stores/reportStore";
import { sanitizeFilename, getBulanIndonesia } from "../utils/helpers";

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
      Table,
      TableRow,
      TableCell,
      WidthType,
      BorderStyle,
    } = await import("docx");
    const { saveAs } = await import("file-saver");

    const children: any[] = [];

    children.push(
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
      new Paragraph({
        border: {
          bottom: {
            color: "000000",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        text: "LAPORAN KINERJA PEGAWAI",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: `Periode: ${getBulanIndonesia(parseInt(store.config.bulan))} ${store.config.tahun}`,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({ text: "" }),
    );

    const lines = store.output.content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        children.push(
          new Paragraph({
            text: trimmed.replace("## ", ""),
            heading: HeadingLevel.HEADING_1,
          }),
        );
      } else if (trimmed.startsWith("### ")) {
        children.push(
          new Paragraph({
            text: trimmed.replace("### ", ""),
            heading: HeadingLevel.HEADING_2,
          }),
        );
      } else if (trimmed !== "") {
        children.push(new Paragraph({ text: trimmed }));
      }
    }

    children.push(
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
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
              new TableCell({
                children: [],
                width: { size: 50, type: WidthType.PERCENTAGE },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: `${store.instansi.titimangsa}, ${new Date().toLocaleDateString("id-ID")}`,
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({
                    text: "Pejabat Penilai,",
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ text: "" }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: store.instansi.kepala.nama,
                        bold: true,
                        underline: { type: "single" },
                      }),
                    ],
                    alignment: AlignmentType.CENTER,
                  }),
                  new Paragraph({
                    text: `NIP. ${store.instansi.kepala.nip}`,
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

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
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

import { marked } from "marked";
import DOMPurify from "dompurify";

export const parseMarkdown = async (text: string): Promise<string> => {
  if (!text) return "";

  // Pastikan GFM aktif untuk tabel
  const html = await marked.parse(text, {
    async: true,
    gfm: true,
    breaks: true,
  });
  return DOMPurify.sanitize(html);
};

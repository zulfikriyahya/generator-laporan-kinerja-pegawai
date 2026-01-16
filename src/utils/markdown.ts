import { marked } from "marked";
import DOMPurify from "dompurify";

export const parseMarkdown = async (text: string): Promise<string> => {
	if (!text) return "";

	// Pastikan gfm (Github Flavored Markdown) true agar Tabel dirender
	marked.use({
		breaks: true,
		gfm: true, 
	});

	try {
		const rawHtml = await marked.parse(text);
		return DOMPurify.sanitize(rawHtml as string);
	} catch (error) {
		console.error("Markdown parsing error", error);
		return `<p class="text-red-400">Gagal merender format laporan.</p><pre>${text}</pre>`;
	}
};
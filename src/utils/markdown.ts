// ============================================================================
// ENHANCED MARKDOWN PARSER
// Version: 1.0.0
// ============================================================================

import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
	gfm: true,
	breaks: true,
	headerIds: false,
	mangle: false,
	pedantic: false,
});

export const parseMarkdown = async (text: string): Promise<string> => {
	if (!text) return "";

	try {
		// Simple parse without custom renderer
		let html = marked.parse(text) as string;

		// Clean up any markdown artifacts
		html = html
			.replace(/^```markdown\s*/i, "")
			.replace(/^```\s*/i, "")
			.replace(/```\s*$/i, "")
			.trim();

		// Sanitize
		const sanitized = DOMPurify.sanitize(html, {
			ALLOWED_TAGS: [
				"h1", "h2", "h3", "h4", "h5", "h6",
				"p", "br", "strong", "em", "u", "s", "del", "ins", "mark", "small", "sub", "sup",
				"ul", "ol", "li",
				"table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
				"blockquote", "code", "pre",
				"a", "img", "figure", "figcaption",
				"div", "span", "hr",
			],
			ALLOWED_ATTR: [
				"href", "src", "alt", "title", "class", "id", "target", "rel",
				"colspan", "rowspan", "start", "type", "loading", "style",
			],
			ALLOW_DATA_ATTR: false,
		});

		return sanitized;
	} catch (error) {
		console.error("[Markdown Parser] Parsing error:", error);
		return `<div class="p-4 bg-red-50 border border-red-200 rounded text-red-700">
      <strong>Error:</strong> Gagal memproses konten markdown. ${error instanceof Error ? error.message : ''}
    </div>`;
	}
};

export const stripMarkdown = (markdown: string): string => {
	return (
		markdown
			.replace(/```[\s\S]*?```/g, "")
			.replace(/`([^`]+)`/g, "$1")
			.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
			.replace(/^#{1,6}\s+/gm, "")
			.replace(/\*\*([^*]+)\*\*/g, "$1")
			.replace(/__([^_]+)__/g, "$1")
			.replace(/\*([^*]+)\*/g, "$1")
			.replace(/_([^_]+)_/g, "$1")
			.replace(/~~([^~]+)~~/g, "$1")
			.replace(/^[-*_]{3,}$/gm, "")
			.replace(/^\s*>\s+/gm, "")
			.replace(/\s+/g, " ")
			.trim()
	);
};

export const getWordCount = (markdown: string): number => {
	const plain = stripMarkdown(markdown);
	const words = plain.split(/\s+/).filter((word) => word.length > 0);
	return words.length;
};

export const getReadingTime = (markdown: string): string => {
	const wordCount = getWordCount(markdown);
	const minutes = Math.ceil(wordCount / 200);
	return minutes === 0 ? "< 1 menit" : `${minutes} menit`;
};

export const getTableOfContents = (
	markdown: string,
): Array<{ level: number; text: string; id: string }> => {
	const headings: Array<{ level: number; text: string; id: string }> = [];
	const lines = markdown.split("\n");

	for (const line of lines) {
		const match = line.match(/^(#{1,6})\s+(.+)$/);
		if (match) {
			const level = match[1].length;
			const text = match[2].trim();
			const id = text.toLowerCase().replace(/[^\w]+/g, "-");

			headings.push({ level, text, id });
		}
	}

	return headings;
};

export const validateMarkdown = (
	markdown: string,
): { valid: boolean; warnings: string[] } => {
	const warnings: string[] = [];

	const codeBlockCount = (markdown.match(/```/g) || []).length;
	if (codeBlockCount % 2 !== 0) {
		warnings.push("Ditemukan code block yang tidak ditutup");
	}

	const openBrackets = (markdown.match(/\[/g) || []).length;
	const closeBrackets = (markdown.match(/\]/g) || []).length;
	if (openBrackets !== closeBrackets) {
		warnings.push("Ditemukan link yang tidak lengkap");
	}

	const emptyHeaders = markdown.match(/^#{1,6}\s*$/gm);
	if (emptyHeaders && emptyHeaders.length > 0) {
		warnings.push("Ditemukan heading kosong");
	}

	return {
		valid: warnings.length === 0,
		warnings,
	};
};

export default {
	parseMarkdown,
	stripMarkdown,
	getWordCount,
	getReadingTime,
	getTableOfContents,
	validateMarkdown,
};
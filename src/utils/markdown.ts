// ============================================================================
// ENHANCED MARKDOWN PARSER
// Version: 1.0.0
// ============================================================================

import { marked } from "marked";
import DOMPurify from "dompurify";

// ============================================================================
// CONFIGURATION
// ============================================================================

marked.setOptions({
	gfm: true, // GitHub Flavored Markdown
	breaks: true, // Convert \n to <br>
	headerIds: true,
	mangle: false,
	pedantic: false,
});

// ============================================================================
// CUSTOM RENDERER
// ============================================================================

const renderer = new marked.Renderer();

/**
 * Enhanced table renderer dengan styling yang lebih baik
 */
renderer.table = (header: string, body: string): string => {
	return `
    <div class="table-wrapper overflow-x-auto my-6 shadow-sm">
      <table class="report-table min-w-full border-collapse border border-slate-300">
        <thead class="bg-slate-100">${header}</thead>
        <tbody class="bg-white">${body}</tbody>
      </table>
    </div>
  `;
};

/**
 * Enhanced table header cell renderer
 */
renderer.tablecell = (
	content: string,
	flags: {
		header: boolean;
		align: "center" | "left" | "right" | null;
	},
): string => {
	const type = flags.header ? "th" : "td";
	const align = flags.align ? ` style="text-align: ${flags.align}"` : "";
	const classes = flags.header
		? "px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border border-slate-300"
		: "px-4 py-3 text-sm text-slate-900 border border-slate-300";

	return `<${type}${align} class="${classes}">${content}</${type}>`;
};

/**
 * Enhanced heading renderer dengan anchor links dan proper hierarchy
 */
renderer.heading = (text: string, level: number): string => {
	const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

	const sizeClasses = {
		1: "text-2xl font-bold mb-6 mt-8 pb-2 border-b-2 border-slate-200",
		2: "text-xl font-bold mb-4 mt-6",
		3: "text-lg font-semibold mb-3 mt-5",
		4: "text-base font-semibold mb-2 mt-4",
		5: "text-sm font-semibold mb-2 mt-3",
		6: "text-sm font-semibold mb-2 mt-2",
	};

	const sizeClass = sizeClasses[level as keyof typeof sizeClasses] || "";

	return `
    <h${level} id="${escapedText}" class="heading-${level} ${sizeClass} group relative">
      ${text}
      <a href="#${escapedText}" class="anchor-link opacity-0 group-hover:opacity-100 ml-2 text-blue-500 transition-opacity">#</a>
    </h${level}>
  `;
};

/**
 * Enhanced list renderer
 */
renderer.list = (body: string, ordered: boolean, start: number): string => {
	const type = ordered ? "ol" : "ul";
	const startAttr = ordered && start !== 1 ? ` start="${start}"` : "";
	const listStyle = ordered ? "list-decimal" : "list-disc";

	return `<${type}${startAttr} class="${listStyle} ml-6 my-4 space-y-2">${body}</${type}>`;
};

/**
 * Enhanced list item renderer
 */
renderer.listitem = (text: string): string => {
	return `<li class="text-sm leading-relaxed">${text}</li>`;
};

/**
 * Enhanced blockquote renderer
 */
renderer.blockquote = (quote: string): string => {
	return `
    <blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-slate-600 bg-blue-50 rounded-r">
      ${quote}
    </blockquote>
  `;
};

/**
 * Enhanced code block renderer dengan syntax highlighting support
 */
renderer.code = (code: string, language: string | undefined): string => {
	const lang = language || "text";
	const escapedCode = escapeHtml(code);

	return `
    <div class="code-block my-4">
      <div class="code-header bg-slate-800 text-slate-300 px-4 py-2 rounded-t text-xs font-mono">
        ${lang}
      </div>
      <pre class="bg-slate-900 text-slate-100 rounded-b p-4 overflow-x-auto"><code class="language-${lang}">${escapedCode}</code></pre>
    </div>
  `;
};

/**
 * Enhanced inline code renderer
 */
renderer.codespan = (code: string): string => {
	return `<code class="bg-slate-100 text-red-600 px-2 py-1 rounded text-sm font-mono">${code}</code>`;
};

/**
 * Enhanced paragraph renderer
 */
renderer.paragraph = (text: string): string => {
	return `<p class="mb-4 text-sm leading-relaxed text-justify">${text}</p>`;
};

/**
 * Enhanced link renderer dengan security
 */
renderer.link = (href: string, title: string | null, text: string): string => {
	const titleAttr = title ? ` title="${title}"` : "";
	const isExternal = href.startsWith("http");
	const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";

	return `<a href="${href}"${titleAttr}${externalAttrs} class="text-blue-600 hover:text-blue-800 underline">${text}</a>`;
};

/**
 * Enhanced image renderer dengan lazy loading
 */
renderer.image = (href: string, title: string | null, text: string): string => {
	const titleAttr = title ? ` title="${title}"` : "";
	const altAttr = text ? ` alt="${text}"` : "";

	return `
    <figure class="my-6">
      <img src="${href}"${altAttr}${titleAttr} loading="lazy" class="max-w-full h-auto rounded shadow-lg" />
      ${title ? `<figcaption class="text-center text-sm text-slate-600 mt-2 italic">${title}</figcaption>` : ""}
    </figure>
  `;
};

/**
 * Enhanced strong (bold) renderer
 */
renderer.strong = (text: string): string => {
	return `<strong class="font-bold text-slate-900">${text}</strong>`;
};

/**
 * Enhanced emphasis (italic) renderer
 */
renderer.em = (text: string): string => {
	return `<em class="italic">${text}</em>`;
};

/**
 * Enhanced horizontal rule renderer
 */
renderer.hr = (): string => {
	return `<hr class="my-8 border-t-2 border-slate-200" />`;
};

// Apply custom renderer
marked.use({ renderer });

// ============================================================================
// MAIN PARSER FUNCTION
// ============================================================================

/**
 * Parse markdown to HTML with enhanced rendering and sanitization
 */
export const parseMarkdown = async (text: string): Promise<string> => {
	if (!text) return "";

	try {
		// Parse markdown
		const html = await marked.parse(text, { async: true });

		// Sanitize with comprehensive config
		const sanitized = DOMPurify.sanitize(html, {
			ALLOWED_TAGS: [
				// Headings
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				// Text formatting
				"p",
				"br",
				"strong",
				"em",
				"u",
				"s",
				"del",
				"ins",
				"mark",
				"small",
				"sub",
				"sup",
				// Lists
				"ul",
				"ol",
				"li",
				// Tables
				"table",
				"thead",
				"tbody",
				"tfoot",
				"tr",
				"th",
				"td",
				"caption",
				// Quotes and code
				"blockquote",
				"code",
				"pre",
				// Links and media
				"a",
				"img",
				"figure",
				"figcaption",
				// Structure
				"div",
				"span",
				"hr",
				// Semantic
				"article",
				"section",
				"aside",
				"nav",
			],
			ALLOWED_ATTR: [
				"href",
				"src",
				"alt",
				"title",
				"class",
				"id",
				"target",
				"rel",
				"colspan",
				"rowspan",
				"start",
				"type",
				"loading",
				"style", // Limited style for alignment
			],
			ALLOWED_STYLES: {
				"*": {
					"text-align": [/^(left|right|center|justify)$/],
				},
			},
			ALLOW_DATA_ATTR: false,
			ADD_ATTR: ["target", "rel"], // For external links
		});

		return sanitized;
	} catch (error) {
		console.error("[Markdown Parser] Parsing error:", error);
		return `<div class="p-4 bg-red-50 border border-red-200 rounded text-red-700">
      <strong>Error:</strong> Gagal memproses konten markdown.
    </div>`;
	}
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Escape HTML special characters
 */
const escapeHtml = (unsafe: string): string => {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
};

/**
 * Strip markdown from text (get plain text)
 */
export const stripMarkdown = (markdown: string): string => {
	return (
		markdown
			// Remove code blocks
			.replace(/```[\s\S]*?```/g, "")
			// Remove inline code
			.replace(/`([^`]+)`/g, "$1")
			// Remove images
			.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
			// Remove links
			.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
			// Remove headers
			.replace(/^#{1,6}\s+/gm, "")
			// Remove bold
			.replace(/\*\*([^*]+)\*\*/g, "$1")
			.replace(/__([^_]+)__/g, "$1")
			// Remove italic
			.replace(/\*([^*]+)\*/g, "$1")
			.replace(/_([^_]+)_/g, "$1")
			// Remove strikethrough
			.replace(/~~([^~]+)~~/g, "$1")
			// Remove horizontal rules
			.replace(/^[-*_]{3,}$/gm, "")
			// Remove blockquotes
			.replace(/^\s*>\s+/gm, "")
			// Clean up multiple spaces
			.replace(/\s+/g, " ")
			.trim()
	);
};

/**
 * Get word count from markdown
 */
export const getWordCount = (markdown: string): number => {
	const plain = stripMarkdown(markdown);
	const words = plain.split(/\s+/).filter((word) => word.length > 0);
	return words.length;
};

/**
 * Get reading time estimate (average 200 words per minute)
 */
export const getReadingTime = (markdown: string): string => {
	const wordCount = getWordCount(markdown);
	const minutes = Math.ceil(wordCount / 200);
	return minutes === 0 ? "< 1 menit" : `${minutes} menit`;
};

/**
 * Get table of contents from markdown
 */
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

/**
 * Validate markdown structure
 */
export const validateMarkdown = (
	markdown: string,
): { valid: boolean; warnings: string[] } => {
	const warnings: string[] = [];

	// Check for unclosed code blocks
	const codeBlockCount = (markdown.match(/```/g) || []).length;
	if (codeBlockCount % 2 !== 0) {
		warnings.push("Ditemukan code block yang tidak ditutup");
	}

	// Check for unclosed links
	const openBrackets = (markdown.match(/\[/g) || []).length;
	const closeBrackets = (markdown.match(/\]/g) || []).length;
	if (openBrackets !== closeBrackets) {
		warnings.push("Ditemukan link yang tidak lengkap");
	}

	// Check for empty headers
	const emptyHeaders = markdown.match(/^#{1,6}\s*$/gm);
	if (emptyHeaders && emptyHeaders.length > 0) {
		warnings.push("Ditemukan heading kosong");
	}

	return {
		valid: warnings.length === 0,
		warnings,
	};
};

// ============================================================================
// EXPORT
// ============================================================================

export default {
	parseMarkdown,
	stripMarkdown,
	getWordCount,
	getReadingTime,
	getTableOfContents,
	validateMarkdown,
};
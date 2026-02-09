import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
});

export const parseMarkdown = async (text: string): Promise<string> => {
  if (!text) return "";
  const renderer = new marked.Renderer();

  renderer.table = (header: string, body: string) => {
    return `<table class="report-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
  };

  renderer.heading = (text: string, level: number) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    return `<h${level} id="${escapedText}" class="heading-${level}">${text}</h${level}>`;
  };

  marked.use({ renderer });
  const html = await marked.parse(text);

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "blockquote",
      "code",
      "pre",
      "a",
      "img",
      "div",
      "span",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
  });
};

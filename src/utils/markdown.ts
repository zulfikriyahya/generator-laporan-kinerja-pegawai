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

  renderer.heading = (text: any, level: number) => {
    const textContent = typeof text === "string" ? text : text.text || "";
    const escapedText = textContent.toLowerCase().replace(/[^\w]+/g, "-");
    return `<h${level} id="${escapedText}" class="heading-${level}">${textContent}</h${level}>`;
  };

  renderer.list = (body: string, ordered: boolean, start: number) => {
    const type = ordered ? "ol" : "ul";
    const startAttr = ordered && start !== 1 ? ` start="${start}"` : "";
    return `<${type}${startAttr} class="report-list">${body}</${type}>`;
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
      "hr",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
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
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "id",
      "start",
      "align",
      "style",
    ],
  });
};

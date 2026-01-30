import { jsPDF } from "jspdf";

type Message = { role: "user" | "assistant"; content: string };

/** Resume-like section headings (case-insensitive) */
const RESUME_SECTION_MARKERS = [
  "experience",
  "education",
  "skills",
  "summary",
  "professional summary",
  "work experience",
  "technical skills",
  "certifications",
  "projects",
  "contact",
  "objective",
];

/** Check if messages contain a complete resume (filled template with sections) */
export function looksLikeCompleteResume(messages: Message[]): boolean {
  const assistantContent = messages
    .filter((m) => m.role === "assistant" && m.content.trim())
    .map((m) => m.content)
    .join("\n");
  if (!assistantContent || assistantContent.length < 400) return false;
  const lower = assistantContent.toLowerCase();
  const sectionCount = RESUME_SECTION_MARKERS.filter((marker) =>
    lower.includes(marker)
  ).length;
  return sectionCount >= 2;
}

/** Strip markdown to plain text for PDF */
function markdownToPlainText(md: string): string {
  return md
    .replace(/#{1,6}\s/g, "\n")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^[-*]\s/gm, "• ")
    .replace(/^\d+\.\s/gm, "")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/^#+\s/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Build resume content from assistant messages only */
function getResumeContent(messages: Message[]): string {
  const assistantContent = messages
    .filter((m) => m.role === "assistant")
    .map((m) => markdownToPlainText(m.content))
    .join("\n\n---\n\n");
  return assistantContent || "No resume content yet.";
}

/** Generate and download PDF from chat messages */
export function downloadResumeAsPdf(messages: Message[], filename = "My_Resume.pdf"): void {
  const content = getResumeContent(messages);
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;
  const lineHeight = 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(22);
  doc.text("Resume", margin, y);
  y += 12;

  doc.setFontSize(10);
  const lines = doc.splitTextToSize(content, maxWidth);

  for (const line of lines) {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }

  doc.save(filename);
}

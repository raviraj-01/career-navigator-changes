import type { StoredMessage } from "./userResumes";

/** Section markers that ATS systems look for (case-insensitive) */
const ATS_SECTION_MARKERS = [
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

/**
 * Compute an ATS-friendly score (0–100) from resume content.
 * Based on section presence, content length, and structure.
 */
export function computeAtsScore(messages: StoredMessage[]): number {
  const text = messages
    .filter((m) => m.role === "assistant" && m.content.trim())
    .map((m) => m.content)
    .join("\n");
  const lower = text.toLowerCase();

  let score = 0;

  // Sections found (max ~55): 5 pts per section, up to 11 sections
  const sectionsFound = ATS_SECTION_MARKERS.filter((marker) => lower.includes(marker)).length;
  score += Math.min(sectionsFound * 5, 55);

  // Content length (max ~25): longer, structured content scores higher
  const len = text.length;
  if (len >= 400) score += 5;
  if (len >= 800) score += 5;
  if (len >= 1200) score += 5;
  if (len >= 1800) score += 5;
  if (len >= 2500) score += 5;

  // Basic structure (max ~20): has headings and bullets
  if (lower.includes("•") || lower.includes("- ")) score += 5;
  if (/#+\s|\*\*/.test(text)) score += 5;
  if (sectionsFound >= 3) score += 10;

  return Math.min(Math.max(score, 0), 100);
}

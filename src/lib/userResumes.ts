/** Message shape used by chat and PDF generation */
export type StoredMessage = { role: "user" | "assistant"; content: string };

export type StoredResume = {
  id: string;
  title: string;
  role?: string;
  company?: string;
  created: string;
  status: string;
  messages: StoredMessage[];
  /** ATS score 0–100 (computed when resume is saved) */
  atsScore?: number;
};

const STORAGE_PREFIX = "resumeai_resumes_";

export function getResumesForUser(userId: string): StoredResume[] {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + userId);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredResume[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveResumesForUser(userId: string, resumes: StoredResume[]): void {
  localStorage.setItem(STORAGE_PREFIX + userId, JSON.stringify(resumes));
}

export function addResumeForUser(
  userId: string,
  resume: Omit<StoredResume, "id">
): StoredResume {
  const list = getResumesForUser(userId);
  const id = Date.now().toString();
  const newResume: StoredResume = { ...resume, id };
  saveResumesForUser(userId, [...list, newResume]);
  return newResume;
}

export function deleteResumeForUser(userId: string, resumeId: string): void {
  const list = getResumesForUser(userId).filter((r) => r.id !== resumeId);
  saveResumesForUser(userId, list);
}

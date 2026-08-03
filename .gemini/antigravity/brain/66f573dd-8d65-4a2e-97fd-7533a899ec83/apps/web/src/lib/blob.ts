import { put, get, del } from "@vercel/blob";

export interface ExamManifestEntry {
  examId: string;
  title: string;
  session: string;
  examDate: string;
  publishAt: string;
  expiresAt: string;
}

export interface ParsedRange {
  roll_from: string;
  roll_to: string;
  label?: string | null;
  count?: number | null;
}

export interface ParsedRoom {
  room_no: string;
  ranges: ParsedRange[];
}

export interface ExamData extends ExamManifestEntry {
  rooms: ParsedRoom[];
  cleared?: boolean;
}

const MANIFEST_PATH = "exam-seating/manifest.json";
const ACCESS = "private" as const;

async function readPrivateJson<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: ACCESS });
    if (!result) return null;
    const res = new Response(result.stream);
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function readManifest(): Promise<ExamManifestEntry[]> {
  try {
    const data = await readPrivateJson<{ exams: ExamManifestEntry[] }>(MANIFEST_PATH);
    return data?.exams || [];
  } catch {
    return [];
  }
}

export async function writeManifest(exams: ExamManifestEntry[]): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify({ exams }), {
    access: ACCESS,
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
  });
}

export function examBlobPath(examId: string): string {
  return `exam-seating/exams/${examId}.json`;
}

export async function writeExamData(examId: string, data: ExamData): Promise<string> {
  const blob = await put(examBlobPath(examId), JSON.stringify(data), {
    access: ACCESS,
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
  });
  return blob.url;
}

export async function readExamData(examId: string): Promise<ExamData | null> {
  return readPrivateJson<ExamData>(examBlobPath(examId));
}

export async function deleteExamData(examId: string): Promise<void> {
  try {
    await del(examBlobPath(examId));
  } catch {
    // fine if missing
  }
}

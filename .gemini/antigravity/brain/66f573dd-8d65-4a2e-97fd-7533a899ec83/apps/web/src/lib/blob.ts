import { put, get, del } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

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

const LOCAL_DATA_DIR = path.join(process.cwd(), ".local_data");

async function ensureLocalDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {
    // directory exists
  }
}

function isVercelBlobAvailable(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// --- Local File System Storage ---
async function readLocalJson<T>(relativePath: string): Promise<T | null> {
  try {
    const fullPath = path.join(LOCAL_DATA_DIR, relativePath);
    const content = await fs.readFile(fullPath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

async function writeLocalJson(relativePath: string, data: any): Promise<string> {
  const fullPath = path.join(LOCAL_DATA_DIR, relativePath);
  await ensureLocalDir(path.dirname(fullPath));
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf-8");
  return `file://${fullPath}`;
}

async function deleteLocalFile(relativePath: string): Promise<void> {
  try {
    const fullPath = path.join(LOCAL_DATA_DIR, relativePath);
    await fs.unlink(fullPath);
  } catch {
    // file missing
  }
}

// --- Combined Storage Interface ---
async function readPrivateJson<T>(pathname: string): Promise<T | null> {
  if (isVercelBlobAvailable()) {
    try {
      const result = await get(pathname, { access: ACCESS, useCache: false });
      if (!result) return null;
      const res = new Response(result.stream);
      return (await res.json()) as T;
    } catch {
      // fallback to local read if Vercel Blob fails
      return readLocalJson<T>(pathname);
    }
  }
  return readLocalJson<T>(pathname);
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
  if (isVercelBlobAvailable()) {
    try {
      await put(MANIFEST_PATH, JSON.stringify({ exams }), {
        access: ACCESS,
        addRandomSuffix: false,
        contentType: "application/json",
        allowOverwrite: true,
      });
      return;
    } catch {
      // fallback to local write
    }
  }
  await writeLocalJson(MANIFEST_PATH, { exams });
}

export function examBlobPath(examId: string): string {
  return `exam-seating/exams/${examId}.json`;
}

export async function writeExamData(examId: string, data: ExamData): Promise<string> {
  const relPath = examBlobPath(examId);
  if (isVercelBlobAvailable()) {
    try {
      const blob = await put(relPath, JSON.stringify(data), {
        access: ACCESS,
        addRandomSuffix: false,
        contentType: "application/json",
        allowOverwrite: true,
      });
      return blob.url;
    } catch {
      // fallback to local write
    }
  }
  return writeLocalJson(relPath, data);
}

export async function readExamData(examId: string): Promise<ExamData | null> {
  return readPrivateJson<ExamData>(examBlobPath(examId));
}

export async function deleteExamData(examId: string): Promise<void> {
  const relPath = examBlobPath(examId);
  if (isVercelBlobAvailable()) {
    try {
      await del(relPath);
    } catch {
      // ignore
    }
  }
  await deleteLocalFile(relPath);
}

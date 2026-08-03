import { NextResponse } from "next/server";
import { readExamData, readManifest } from "~/lib/blob";

export async function GET(
  req: Request,
  { params }: { params: { examId: string } }
) {
  const { examId } = params;

  const exam = await readExamData(examId);

  if (!exam) {
    const manifest = await readManifest();
    const entry = manifest.find((e) => e.examId === examId);
    if (!entry) {
      return NextResponse.json(
        { error: "Exam not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(
      {
        examId: entry.examId,
        title: entry.title,
        session: entry.session,
        examDate: entry.examDate,
        publishAt: entry.publishAt,
        expiresAt: entry.expiresAt,
        status: "expired",
      },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=300" } }
    );
  }

  const now = Date.now();
  const publishAt = new Date(exam.publishAt).getTime();
  const expiresAt = new Date(exam.expiresAt).getTime();

  const base = {
    examId: exam.examId,
    title: exam.title,
    session: exam.session,
    examDate: exam.examDate,
    publishAt: exam.publishAt,
    expiresAt: exam.expiresAt,
  };

  if (now < publishAt) {
    return NextResponse.json(
      { ...base, status: "scheduled" },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=5" } }
    );
  }

  if (now > expiresAt || exam.cleared) {
    return NextResponse.json(
      { ...base, status: "expired" },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=300" } }
    );
  }

  return NextResponse.json(
    { ...base, status: "live", rooms: exam.rooms },
    { status: 200, headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30" } }
  );
}

import { StudentSearch } from "~/components/StudentSearch";
import { notFound } from "next/navigation";

export const revalidate = 0; // dynamic client fetch

export default async function ExamPage({ params }: { params: { examId: string } }) {
  const host = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  const res = await fetch(`${host}/api/seating/${params.examId}`, {
    cache: "no-store",
  });

  if (!res.ok && res.status === 404) {
    notFound();
  }

  const data = await res.json();

  return (
    <div className="py-6">
      <StudentSearch
        examId={data.examId}
        title={data.title || "Exam Seating"}
        session={data.session || "Morning"}
        status={data.status}
        publishAt={data.publishAt}
        rooms={data.rooms || []}
      />
    </div>
  );
}

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { readExamData, readManifest } from "~/lib/blob";

export const seatingRouter = createTRPCRouter({
  getManifest: publicProcedure.query(async () => {
    return await readManifest();
  }),

  getSeating: publicProcedure
    .input(z.object({ examId: z.string() }))
    .query(async ({ input }) => {
      const exam = await readExamData(input.examId);
      if (!exam) {
        const manifest = await readManifest();
        const entry = manifest.find((e) => e.examId === input.examId);
        if (!entry) {
          return { status: "not_found" as const };
        }
        return {
          status: "expired" as const,
          manifest: entry,
        };
      }

      const now = Date.now();
      const publishAt = new Date(exam.publishAt).getTime();
      const expiresAt = new Date(exam.expiresAt).getTime();

      const meta = {
        examId: exam.examId,
        title: exam.title,
        session: exam.session,
        examDate: exam.examDate,
        publishAt: exam.publishAt,
        expiresAt: exam.expiresAt,
      };

      if (now < publishAt) {
        return { status: "scheduled" as const, meta };
      }

      if (now > expiresAt || exam.cleared) {
        return { status: "expired" as const, meta };
      }

      return {
        status: "live" as const,
        meta,
        rooms: exam.rooms,
      };
    }),
});

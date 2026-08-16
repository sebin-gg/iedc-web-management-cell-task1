import { createTRPCRouter } from "./trpc";
import { seatingRouter } from "./routers/seating";
import { adminRouter } from "./routers/admin";

export const appRouter = createTRPCRouter({
  seating: seatingRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

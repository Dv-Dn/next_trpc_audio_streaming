// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { trackRouter } from "./track";
import { genreRouter } from "./genre";
import { playlistRouter } from "./playlist";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("track.", trackRouter)
  .merge("genre.", genreRouter)
  .merge("playlist.", playlistRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

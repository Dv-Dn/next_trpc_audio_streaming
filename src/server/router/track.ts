import { createRouter } from "./context";
import { z } from "zod";

export const trackRouter = createRouter()
  .query("get-all", {
    async resolve({ input, ctx }) {
      return await ctx.prisma.track.findMany();
    },
  })
  .query("get-all-by-query", {
    input: z.object({
      query: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.track.findMany({
        where: {
          name: { contains: input.query },
        },
      });
    },
  })
  .query("get-all-by-user", {
    input: z.object({
      userId: z.string(),
    }),

    async resolve({ ctx }) {
      return await ctx.prisma.track.findMany();
    },
  })

  .mutation("add-track", {
    input: z.object({
      name: z.string().min(4),
      year: z.number().min(4),
      url: z.string().url(),
      albumId: z.string().optional(),
      artistId: z.string().optional(),
      genreId: z.string().optional(),
    }),

    async resolve({ input, ctx }) {
      const userId = ctx.session?.user?.id;
      if (!userId) return;

      const track = await ctx.prisma.track.create({
        data: {
          name: input.name,
          year: input.year,
          auditionsCount: 0,
          url: input.url,
          userId,
          genreId: input.genreId,
          artistId: input.artistId,
          albumId: input.albumId,
        },
      });

      return track;
    },
  });

import { createRouter } from "./context";
import { z } from "zod";

export const playlistRouter = createRouter()
  .query("get-all", {
    async resolve({ input, ctx }) {
      return await ctx.prisma.playlist.findMany();
    },
  })
  .mutation("create", {
    async resolve({ input, ctx }) {
      if (!ctx.session?.user) return;

      const playlistsCount = await ctx.prisma.playlist.count();

      return await ctx.prisma.playlist.create({
        data: {
          name: `New playlist ${playlistsCount + 1}`,
          userId: ctx.session.user?.id,
        },
      });
    },
  });

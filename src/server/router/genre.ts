import { createRouter } from "./context";
import { z } from "zod";
import { generateGenres } from "../common/generateGenres";

const musicGenres = [
  "Pop music",
  "Hip hop music",
  "Rock music",
  "Rhythm and blues",
  "Soul music",
  "Reggae",
  "Country",
  "Funk",
  "Folk music",
  "Middle Eastern music",
  "Jazz",
  "Disco",
  "Classical music",
  "Electronic music",
  "Music of Latin America",
  "Blues",
  "Music for children",
  "New-age music",
  "Vocal music",
  "Music of Africa",
  "Christian music",
  "Music of Asia",
  "Ska",
  "Traditional music",
  "Independent music",
];

export const genreRouter = createRouter()
  .mutation("init-genres", {
    async resolve({}) {
      musicGenres.forEach(async (genre) => {
        await prisma?.genre?.create({
          data: {
            name: genre,
          },
        });
      });

      return {
        message: "Success",
      };
    },
  })
  .query("get-all", {
    async resolve({ ctx }) {
      return await ctx.prisma.genre.findMany();
    },
  });

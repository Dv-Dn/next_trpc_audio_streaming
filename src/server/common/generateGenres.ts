import { prisma } from "@/server/db/client";

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

export async function generateGenres() {
  musicGenres.forEach(async (genre) => {
    await prisma?.genre?.create({
      data: {
        name: genre,
      },
    });
  });
}

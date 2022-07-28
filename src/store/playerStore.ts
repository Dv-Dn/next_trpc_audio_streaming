import { Track } from "@prisma/client";
import create from "zustand";

export interface PlayerInterface {
  track: {
    url: string;
    name: string;
    genre?: string;
    artist?: string;
  };
  setTrack: (track: Track) => void;
}

export const usePlayerStore = create<PlayerInterface>((set) => ({
  track: {
    url: "",
    name: "",
    genre: "",
    artist: "",
  },

  setTrack: (track: Track) => set((state) => ({ track })),
}));

import create from "zustand";

interface LoaderProps {
  loading: boolean;

  setLoading: (loading: boolean) => void;
}

const useLoader = create<LoaderProps>((set) => ({
  loading: false,

  setLoading: (loading: boolean) => set(() => ({ loading })),
}));

export { useLoader };

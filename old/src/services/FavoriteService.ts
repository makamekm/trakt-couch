import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useLocalStore } from "mobx-react";
import { useSyncLocalStorage } from "~/hooks";

export const FavoriteService = createService(
  () => {
    const state = useLocalStore(() => ({
      favoriteShows: [] as {
        title: string;
        id: string;
        poster: string;
      }[],
    }));
    return state;
  },
  (state) => {
    useSyncLocalStorage(state, "favoriteShows");
  }
);

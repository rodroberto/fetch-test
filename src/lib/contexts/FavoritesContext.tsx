import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface IFavoritesContext {
  favoriteIds: string[];
  setFavoriteIds: (id: string, value: boolean) => void;
}

const FavoritesContext = createContext<IFavoritesContext>({
  favoriteIds: [],
  setFavoriteIds: () => {},
});

const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const onChangeFavorites = useCallback((id: string, value: boolean) => {
    if (value) {
      setFavoriteIds((prev) => [...prev, id]);
    } else {
      setFavoriteIds((prev) => prev.filter((item) => item !== id));
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, setFavoriteIds: onChangeFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesContext");
  }
  return context;
};

export { FavoritesContext, FavoritesProvider, useFavorites };

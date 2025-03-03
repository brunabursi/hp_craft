import { Character } from "@/api/types";
import { useAppStore } from "@/hooks/uiHooks";

type FavoriteStarProps = {
  character: Character;
};

const FavoriteStar = ({ character }: FavoriteStarProps) => {
  const {
    favoriteCharacterIds,
    addFavoriteCharacter,
    removeFavoriteCharacter,
  } = useAppStore();
  const isInFavorites = favoriteCharacterIds()[character.id];
  return isInFavorites ? (
    <span
      role="button"
      onClick={() => removeFavoriteCharacter(character.id)}
      style={{ cursor: "pointer", color: "yellow" }}
    >
      {" ★"}
    </span>
  ) : (
    <span
      role="button"
      onClick={() => addFavoriteCharacter(character)}
      style={{ cursor: "pointer", color: "gray" }}
    >
      {" ★"}
    </span>
  );
};

export default FavoriteStar;

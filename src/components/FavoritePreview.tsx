import { useAppStore } from "@/hooks/uiHooks";
import LinkWithTransition from "./common/LinkWIthTransition";
import useCharacterInitials from "@/utils/useCharacterInitials";

const FavoritesPreview = () => {
  const { favoriteCharacters } = useAppStore();

  if (favoriteCharacters.length === 0) return null;
  return (
    <ul>
      {favoriteCharacters.slice(0, 4).map((character) => (
        <LinkWithTransition
          to={`/character/${character.id}`}
          key={character.id}
          transitionName={"char-image"}
        >
          {(styleObj) => (
            <li
              key={character.id}
              style={{
                ...styleObj,
                border: `4px solid var(--${character.house.toLowerCase()}-color)`,
                backgroundColor: `var(--${character.house.toLowerCase()}-color, var(--secondary-color))`,
                color: "white",
              }}
            >
              {character.image ? (
                <img src={character.image} alt={character.name} />
              ) : (
                <span>{useCharacterInitials(character.name)}</span>
              )}
            </li>
          )}
        </LinkWithTransition>
      ))}
    </ul>
  );
};

export default FavoritesPreview;

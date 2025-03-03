import { Character } from "@/api/types";
import styles from "./CharcterListItem.module.css";
import LinkWithTransition from "./common/LinkWIthTransition";
import FavoriteStar from "./common/FavoriteStar";
import isAlive from "./common/IsAlive";

type CharacterListItemProps = {
  character: Character;
};

const CharacterListItem = ({ character }: CharacterListItemProps) => {
  const targetUrl = `/character/${character.id}`;
  return (
    <div className={styles.container}>
      <LinkWithTransition to={targetUrl} transitionName="char-name">
        {(styleObj) => (
          <li
            className={styles.characterItem}
            style={{
              ...styleObj,
            }}
          >
            {character.name}
            {isAlive(character)}
          </li>
        )}
      </LinkWithTransition>
      <FavoriteStar character={character} />
    </div>
  );
};

export default CharacterListItem;

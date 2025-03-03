import { useParams } from "react-router";
import { getCharacterById } from "@/hooks/dataHooks";
import CharacterDetails from "@/components/CharacterDetails";
import styles from "./Character.module.css";
import FavoriteStar from "@/components/common/FavoriteStar";
import isAlive from "@/components/common/IsAlive";

const Character = () => {
  const params = useParams();
  const { character, isLoading, error } = getCharacterById(
    params?.id || "test"
  );
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  let renderChar;
  if (character?.[0]?.name) {
    renderChar = character[0];
  } else {
    return "tem algo bem errado se entrou aqui";
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        {"Home"}
      </button>
      <header>
        <div className={styles.headerContent}>
          <h1
            className={styles.head1}
            style={{
              viewTransitionName: "char-name",
            }}
          >
            {renderChar.name}
            {isAlive(renderChar)}
            <FavoriteStar character={renderChar} />
          </h1>
          <div className={styles.alternateNames}>
            {renderChar.alternate_names.length > 0 && (
              <p>{renderChar.alternate_names.join(", ")}</p>
            )}
          </div>
        </div>
      </header>
      <CharacterDetails {...renderChar} />
    </div>
  );
};

export default Character;

import useSWR from "swr";
import CharacterListItem from "./CharacterListItem";
import styles from "./RenderCharacterList.module.css";
import FilterTags from "./common/FilterTags";
import { Character } from "@/api/types";
import { House } from "@/api/types";

type RenderCharacterListProps = {
  swrKey: string;
  fetcher:
    | (() => Promise<Character[]>)
    | ((house: House) => Promise<Character[]>);
  house: House;
};

const RenderCharacterList = ({
  swrKey,
  fetcher,
  house,
}: RenderCharacterListProps) => {
  const { data, isLoading, error } = useSWR<Character[]>(swrKey, () =>
    fetcher(house)
  );

  if (error) {
    return <div>Error loading characters</div>;
  }
  return isLoading ? (
    <div>Loading characters...</div>
  ) : (
    <div className={styles.container}>
      <FilterTags />
      <ul className={styles.characterList}>
        {data?.map((character: Character) => (
          <CharacterListItem character={character} />
        ))}
      </ul>
    </div>
  );
};

export default RenderCharacterList;

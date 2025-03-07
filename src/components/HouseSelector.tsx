import { listOfHouses } from "@/api/api";
import { House } from "@/api/types";
import { useAppStore } from "@/hooks/uiHooks";
import styles from "./HouseSelector.module.css";

const HouseSelector = () => {
  const { favoriteHouse, setFavoriteHouse } = useAppStore();

  const handleFavoriteHouse = (house: House) => {
    setFavoriteHouse(house);
    const bodyStyles = window.getComputedStyle(document.body);
    const color = bodyStyles.getPropertyValue(`--${house.toLowerCase()}-color`);
    document.documentElement.style.setProperty("--selected-house-color", color);
  };

  return (
    <div className={styles.container}>
      {listOfHouses.map((house) => (
        <button
          className={
            styles.houseButton +
            " " +
            (favoriteHouse === house ? styles.selected : "")
          }
          key={house}
          onClick={() => handleFavoriteHouse(house)}
          style={{
            backgroundColor: `var(--${house.toLowerCase()}-color)`,
            color: `var(--neutral-color)`,
          }}
          aria-label={house}
          title={house}
        >
          <img src={`/${house.toLowerCase()}.png`} alt={`${house}-logo`} />
        </button>
      ))}
    </div>
  );
};

export default HouseSelector;

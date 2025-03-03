import FavoritesPreview from "./FavoritePreview";
import HouseSelector from "./HouseSelector";
import styles from "./TopBar.module.css";

const TopBar = () => {
  return (
    <div className={styles.container}>
      <HouseSelector />
      <FavoritesPreview />
    </div>
  );
};

export default TopBar;

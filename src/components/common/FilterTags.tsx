import styles from "./FilterTags.module.css";
import { Filter } from "@/api/types";
import { useAppStore } from "@/hooks/uiHooks";

const FilterItems = Object.values(Filter);

const FilterTags = () => {
  const { filter, setFilter } = useAppStore();

  const isActive = (value: string) => {
    return filter === value ? styles.active : "";
  };

  const handleToggleFilter = (value: Filter) => {
    setFilter(value);
  };
  return (
    <ul className={styles.list}>
      {FilterItems.map((filterItem) => (
        <li
          className={styles.chip + " " + isActive(filterItem)}
          onClick={() => handleToggleFilter(filterItem)}
          key={filterItem}
        >
          {filterItem}
        </li>
      ))}
    </ul>
  );
};

export default FilterTags;

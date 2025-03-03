import TopBar from "./components/TopBar";
import RenderCharacterList from "@/components/RenderCharacterList";
import { getFetcherParamsByFilter } from "@/hooks/dataHooks";
import { useAppStore } from "./hooks/uiHooks";
import { Filter } from "./api/types";

function App() {
  const { filter, favoriteHouse } = useAppStore();
  const { swrKey, fetcher } = getFetcherParamsByFilter(filter);

  let fetchKey = swrKey;
  if (filter === Filter.HouseMembers) {
    fetchKey = `${swrKey}-${favoriteHouse}`;
  }
  return (
    <>
      <TopBar />
      <h1>Hogwarts Management System</h1>
      <RenderCharacterList
        swrKey={fetchKey}
        house={favoriteHouse}
        fetcher={fetcher}
      />
    </>
  );
}

export default App;

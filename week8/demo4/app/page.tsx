import { MenuList } from "../components/MenuList";
import { PriceSummary } from "../components/PriceSummary";

export default function Home() {
  return (
    <main>
      <h1>The Daily Grind</h1>
      {/* Open DevTools, Network tab, then refresh. Count the requests. */}
      <PriceSummary />
      <MenuList />
    </main>
  );
}

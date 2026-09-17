import { Suspense } from "react";
import { SearchableCatalog } from "../components/SearchableCatalog";

export default function Home() {
  return (
    <main>
      <h2>New arrivals</h2>
      <Suspense fallback={<p>Loading&hellip;</p>}>
        <SearchableCatalog />
      </Suspense>
    </main>
  );
}

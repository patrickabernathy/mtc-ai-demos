// app/drinks/hot/page.tsx  ->  /drinks/hot
//
// Folders nest, and the URL nests with them. Two folders deep is two
// segments in the address. Still one page.tsx at the bottom doing the work.
export default function HotDrinksPage() {
  return (
    <main>
      <h2>Hot drinks</h2>
      <p>Everything here is served hot.</p>
    </main>
  );
}

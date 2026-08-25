// State 02 — the header pulled out of page.tsx into its own component.
// Nothing changed on screen; only where the markup lives changed.

export function Header() {
  return (
    <header>
      <h1>The Corner Store</h1>
      <p>Corner of Main and Third. Open 6am to 11pm, seven days.</p>
    </header>
  );
}

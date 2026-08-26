// State 01 — static. Same as the live app/page.tsx at the start of the
// demo. Everything is one inline chunk of JSX; nothing is broken into
// components yet.

export default function Home() {
  return (
    <div>
      <header>
        <h1>The Corner Store</h1>
        <p>Corner of Main and Third. Open 6am to 11pm, seven days.</p>
      </header>

      <nav>
        <a href="hours.html">Hours</a> &middot;{" "}
        <a href="mailto:ray@cornerstore.com">Email Ray</a> &middot;{" "}
        <a href="tel:8035550100">Call us</a>
      </nav>
    </div>
  );
}

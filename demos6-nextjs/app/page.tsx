// State 01 — static. Everything is one inline chunk of JSX, same as the
// plain-HTML version we built in Week 3. Nothing is broken into components
// yet — that starts in state 02.

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

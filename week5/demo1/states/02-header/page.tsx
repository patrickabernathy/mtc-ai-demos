// State 02 — page.tsx now renders <Header /> instead of the inline markup.

import { Header } from "./Header";

export default function Home() {
  return (
    <div>
      <Header />

      <nav>
        <a href="hours.html">Hours</a> &middot;{" "}
        <a href="mailto:ray@cornerstore.com">Email Ray</a> &middot;{" "}
        <a href="tel:8035550100">Call us</a>
      </nav>
    </div>
  );
}

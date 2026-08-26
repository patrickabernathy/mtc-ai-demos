// State 04 — full composition. page.tsx only arranges components now;
// Header renders the top, CartList renders the cart, CartRow renders one
// row at a time inside it.

import { Header } from "./Header";
import { CartList } from "./CartList";
import { sampleCart } from "../../types/cart";

export default function Home() {
  return (
    <div>
      <Header />

      <nav>
        <a href="hours.html">Hours</a> &middot;{" "}
        <a href="mailto:ray@cornerstore.com">Email Ray</a> &middot;{" "}
        <a href="tel:8035550100">Call us</a>
      </nav>

      <main>
        <h2>What&apos;s in the cart</h2>
        <CartList items={sampleCart} />
      </main>
    </div>
  );
}

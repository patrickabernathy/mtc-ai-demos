// State 03 — CartRow wired in by hand, one row per item, using the sample
// cart data. No .map() yet — that's state 04, once there's a list
// component to hand the array to.

import { Header } from "./Header";
import { CartRow } from "./CartRow";
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
        <table>
          <tbody>
            <CartRow item={sampleCart[0]} />
            <CartRow item={sampleCart[1]} />
            <CartRow item={sampleCart[2]} />
          </tbody>
        </table>
      </main>
    </div>
  );
}

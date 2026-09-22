import Link from "next/link";
import { Button } from "./Button";

export function Header() {
  return (
    <header>
      <h1 className="text-xl">The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      <nav>
        <Link href="/">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
      <Button>Order now</Button>
    </header>
  );
}

import Link from "next/link";

export function Header() {
  return (
    <header>
      {/* text-xl does nothing until @import "tailwindcss" is in globals.css */}
      <h1 className="text-xl">The Daily Grind</h1>
      <p className="tagline">Coffee cart, order online.</p>
      <nav>
        <Link href="/">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
      <button type="button" className="add-btn">
        Order now
      </button>
    </header>
  );
}

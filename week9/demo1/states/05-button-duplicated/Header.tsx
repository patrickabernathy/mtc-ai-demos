import Link from "next/link";

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
      <button type="button" className="bg-green-600 text-white px-4 py-2 rounded">
        Order now
      </button>
    </header>
  );
}

import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1 className="text-xl">The Daily Grind</h1>
      {/* text-red-500 is a real class, but the old .tagline rule in globals.css sits
          outside Tailwind's layers, so it wins. Take "tagline" off and it goes red. */}
      <p className="tagline text-red-500">Coffee cart, order online.</p>
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

import Link from "next/link";

export function Header() {
  return (
    // A stack on a phone, a row from md (768px) up.
    <header className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      <h1 className="text-xl">The Daily Grind</h1>
      <p className="text-gray-600">Coffee cart, order online.</p>
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

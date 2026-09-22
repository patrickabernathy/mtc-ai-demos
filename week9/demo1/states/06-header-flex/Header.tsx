import Link from "next/link";

export function Header() {
  return (
    // flex goes on the parent. items-center stops the button stretching to the nav's height.
    <header className="flex gap-4 items-center justify-between">
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

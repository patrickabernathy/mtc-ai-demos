import Link from "next/link";

export default function CartPage() {
  return (
    <main>
      <h2>Your cart</h2>
      <p>Items you added on the menu show up here once the cart lives in one place.</p>
      <button type="button" className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800">
        Checkout
      </button>
      <p>
        <Link href="/">Back to the menu</Link>
      </p>
    </main>
  );
}

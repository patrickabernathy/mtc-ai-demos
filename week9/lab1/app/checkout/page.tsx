import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h2>Checkout</h2>
      <p>A one-line stub so the store has a fourth screen.</p>
      <button type="button" className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800">
        Place order
      </button>
      <p>
        <Link href="/">Back to the menu</Link>
      </p>
    </main>
  );
}

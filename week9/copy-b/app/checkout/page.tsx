import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h2>Checkout</h2>
      <p>A one-line stub so the store has a fourth screen.</p>
      <button type="button" className="add-btn">
        Place order
      </button>
      <p>
        <Link href="/">Back to the menu</Link>
      </p>
    </main>
  );
}

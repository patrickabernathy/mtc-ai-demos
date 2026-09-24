import Link from "next/link";
import { Button } from "../../components/Button";

export default function CheckoutPage() {
  return (
    <main>
      <h2>Checkout</h2>
      <p>A one-line stub so the store has a fourth screen.</p>
      <Button>Place order</Button>
      <p>
        <Link href="/">Back to the menu</Link>
      </p>
    </main>
  );
}

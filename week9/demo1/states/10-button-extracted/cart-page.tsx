import Link from "next/link";
import { Button } from "../../components/Button";

export default function CartPage() {
  return (
    <main>
      <h2>Your cart</h2>
      <p>Items you added on the menu show up here once the cart lives in one place.</p>
      <Button>Checkout</Button>
      <p>
        <Link href="/">Back to the menu</Link>
      </p>
    </main>
  );
}

import { CartBadge } from "../components/CartBadge";
import { CartList } from "../components/CartList";

export default function Home() {
  return (
    <main>
      <h1>The Daily Grind</h1>
      <CartBadge />
      <CartList />
    </main>
  );
}

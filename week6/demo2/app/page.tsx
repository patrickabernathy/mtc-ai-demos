import { Header } from "../components/Header";
import { MenuList } from "../components/MenuList";
import { CartList } from "../components/CartList";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <MenuList />
        <CartList />
      </main>
    </div>
  );
}

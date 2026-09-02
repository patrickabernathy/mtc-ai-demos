type MenuItem = {
  name: string;
  price: number;
};

type CartLine = {
  name: string;
  qty: number;
  price: number;
};

const menu: MenuItem[] = [
  { name: "Espresso", price: 2.5 },
  { name: "Latte", price: 4.0 },
  { name: "Cappuccino", price: 4.0 },
  { name: "Mocha", price: 4.5 },
  { name: "Cold Brew", price: 3.75 },
];

const cart: CartLine[] = [
  { name: "Latte", qty: 2, price: 4.0 },
  { name: "Cold Brew", qty: 1, price: 3.75 },
];

const cartTotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

export default function Home() {
  return (
    <div>
      <header>
        <h1>The Daily Grind</h1>
        <p className="tagline">Coffee cart, order online.</p>
      </header>

      <main>
        <div className="menu">
          <h2>Menu</h2>
          <div className="menu-list">
            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Espresso</h3>
                <p className="price">$2.50</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn">-</button>
                <span className="qty">1</span>
                <button type="button" className="qty-btn">+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Latte</h3>
                <p className="price">$4.00</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn">-</button>
                <span className="qty">1</span>
                <button type="button" className="qty-btn">+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Cappuccino</h3>
                <p className="price">$4.00</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn">-</button>
                <span className="qty">1</span>
                <button type="button" className="qty-btn">+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Mocha</h3>
                <p className="price">$4.50</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn">-</button>
                <span className="qty">1</span>
                <button type="button" className="qty-btn">+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Cold Brew</h3>
                <p className="price">$3.75</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn">-</button>
                <span className="qty">1</span>
                <button type="button" className="qty-btn">+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>
          </div>
        </div>

        <div className="cart">
          <h2>Your cart</h2>
          <ul className="cart-list">
            {cart.map((line) => (
              <li className="cart-item" key={line.name}>
                <span className="cart-item-name">{line.name}</span>
                <span className="cart-item-qty">x{line.qty}</span>
                <span className="cart-item-price">${(line.price * line.qty).toFixed(2)}</span>
                <button type="button" className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>
          <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
        </div>
      </main>

      <footer>
        <p className="small">Practice page for the MTC AI-Enabled Full-Stack Developer program. Not a real coffee cart.</p>
      </footer>
    </div>
  );
}

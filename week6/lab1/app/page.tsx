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
  { name: "Croissant", price: 3.25 },
  { name: "Cinnamon Roll", price: 4.5 },
  { name: "Sourdough Loaf", price: 6.0 },
  { name: "Blueberry Muffin", price: 3.75 },
  { name: "Baguette", price: 4.25 },
];

const cart: CartLine[] = [
  { name: "Cinnamon Roll", qty: 2, price: 4.5 },
  { name: "Baguette", qty: 1, price: 4.25 },
];

const cartTotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

export default function Home() {
  return (
    <div>
      <header>
        <h1>Ridgeline Bakery</h1>
        <p className="tagline">Fresh from the oven, order for pickup.</p>
      </header>

      <main>
        <div className="menu">
          <h2>Menu</h2>
          <div className="menu-list">
            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Croissant</h3>
                <p className="price">$3.25</p>
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
                <h3>Cinnamon Roll</h3>
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
                <h3>Sourdough Loaf</h3>
                <p className="price">$6.00</p>
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
                <h3>Blueberry Muffin</h3>
                <p className="price">$3.75</p>
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
                <h3>Baguette</h3>
                <p className="price">$4.25</p>
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
        <p className="small">Practice page for the MTC AI-Enabled Full-Stack Developer program. Not a real bakery.</p>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";

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

export default function Home() {
  const [croissantQty, setCroissantQty] = useState(1);
  const [cinnamonRollQty, setCinnamonRollQty] = useState(1);
  const [sourdoughQty, setSourdoughQty] = useState(1);
  const [muffinQty, setMuffinQty] = useState(1);
  const [baguetteQty, setBaguetteQty] = useState(1);

  const [cart, setCart] = useState<CartLine[]>([]);

  function addToCart(item: MenuItem, qty: number) {
    setCart((prev) => {
      const existing = prev.find((line) => line.name === item.name);
      if (existing) {
        return prev.map((line) =>
          line.name === item.name ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [...prev, { name: item.name, price: item.price, qty }];
    });
  }

  function removeFromCart(name: string) {
    setCart((prev) => prev.filter((line) => line.name !== name));
  }

  const cartTotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

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
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setCroissantQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty">{croissantQty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setCroissantQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={() => addToCart(menu[0], croissantQty)}
              >
                Add to cart
              </button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Cinnamon Roll</h3>
                <p className="price">$4.50</p>
              </div>
              <div className="qty-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setCinnamonRollQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty">{cinnamonRollQty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setCinnamonRollQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={() => addToCart(menu[1], cinnamonRollQty)}
              >
                Add to cart
              </button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Sourdough Loaf</h3>
                <p className="price">$6.00</p>
              </div>
              <div className="qty-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setSourdoughQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty">{sourdoughQty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setSourdoughQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={() => addToCart(menu[2], sourdoughQty)}
              >
                Add to cart
              </button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Blueberry Muffin</h3>
                <p className="price">$3.75</p>
              </div>
              <div className="qty-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setMuffinQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty">{muffinQty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setMuffinQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={() => addToCart(menu[3], muffinQty)}
              >
                Add to cart
              </button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Baguette</h3>
                <p className="price">$4.25</p>
              </div>
              <div className="qty-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setBaguetteQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty">{baguetteQty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setBaguetteQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={() => addToCart(menu[4], baguetteQty)}
              >
                Add to cart
              </button>
            </article>
          </div>
        </div>

        <div className="cart">
          <h2>Your cart</h2>
          {cart.length === 0 ? (
            <p className="cart-empty">Nothing in the cart yet.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((line) => (
                <li className="cart-item" key={line.name}>
                  <span className="cart-item-name">{line.name}</span>
                  <span className="cart-item-qty">x{line.qty}</span>
                  <span className="cart-item-price">${(line.price * line.qty).toFixed(2)}</span>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(line.name)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
        </div>
      </main>

      <footer>
        <p className="small">Practice page for the MTC AI-Enabled Full-Stack Developer program. Not a real bakery.</p>
      </footer>
    </div>
  );
}

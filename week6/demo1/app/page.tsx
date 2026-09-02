'use client'

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
  { name: "Espresso", price: 2.5 },
  { name: "Latte", price: 4.0 },
  { name: "Cappuccino", price: 4.0 },
  { name: "Mocha", price: 4.5 },
  { name: "Cold Brew", price: 3.75 },
];

//const cart: CartLine[] = [
//  { name: "Latte", qty: 2, price: 4.0 },
//  { name: "Cold Brew", qty: 1, price: 3.75 },
//];

//const cartTotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

export default function Home() {
  const [espressoCount, setEspressoCount] = useState(1);
  const [latteCount, setLatteCount] = useState(1);
  const [cappuccinoCount, setCappuccinoCount] = useState(1);
  const [mochaCount, setMochaCount] = useState(1);
  const [coldBrewCount, setColdBrewCount] = useState(1);

  const [cart, setCart] = useState<CartLine[]>([
      { name: "Latte", qty: 2, price: 4.0 },
      { name: "Cold Brew", qty: 1, price: 3.75 },
  ]);

  const [cartTotal, setTotal ] = useState<number>(cart.reduce((sum, line) => sum + line.price * line.qty, 0));

  function addEspressoCount() {
    console.log(addEspressoCount);
    setEspressoCount(espressoCount + 1);
  }

  function removeEspressoCount() {
    if (espressoCount === 1) {
      return;
    }

    setEspressoCount(espressoCount - 1);
  }

  function addItemEspresso() {
    setCart([...cart, { name: "Espresso", qty: espressoCount, price: 2.5 }])
    setTotal(cartTotal + (2.5 * espressoCount));
  }

  function addLatteCount() {
    console.log(addLatteCount);
    setLatteCount(latteCount + 1);
  }

  function removeLatteCount() {
    if (latteCount === 1) {
      return;
    }

    setLatteCount(latteCount - 1);
  }

  function addCappuccinoCount() {
    console.log(addCappuccinoCount);
    setCappuccinoCount(cappuccinoCount + 1);
  }

  function removeCappuccinoCount() {
    if (cappuccinoCount === 1) {
      return;
    }

    setCappuccinoCount(cappuccinoCount - 1);
  }

  function addMochaCount() {
    console.log(addMochaCount);
    setMochaCount(mochaCount + 1);
  }

  function removeMochaCount() {
    if (mochaCount === 1) {
      return;
    }

    setMochaCount(mochaCount - 1);
  }

  function addColdBrewCount() {
    console.log(addColdBrewCount);
    setColdBrewCount(coldBrewCount + 1);
  }

  function removeColdBrewCount() {
    if (coldBrewCount === 1) {
      return;
    }

    setColdBrewCount(coldBrewCount - 1);
  }

  function removeItem(index: number) {
    const line = cart[index];
    setCart(cart.filter((_, itemIndex) => itemIndex !== index));
    setTotal(cartTotal - line.price * line.qty);
  }

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
                <button type="button" className="qty-btn" onClick={removeEspressoCount}>-</button>
                <span className="qty">{espressoCount}</span>
                <button type="button" className="qty-btn" onClick={addEspressoCount}>+</button>
              </div>
              <button type="button" className="add-btn" onClick={addItemEspresso}>Add to cart</button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Latte</h3>
                <p className="price">$4.00</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn" onClick={removeLatteCount}>-</button>
                <span className="qty">{latteCount}</span>
                <button type="button" className="qty-btn" onClick={addLatteCount}>+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Cappuccino</h3>
                <p className="price">$4.00</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn" onClick={removeCappuccinoCount}>-</button>
                <span className="qty">{cappuccinoCount}</span>
                <button type="button" className="qty-btn" onClick={addCappuccinoCount}>+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>

            <article className="menu-item">
              <div className="menu-item-info">
                <h3>Mocha</h3>
                <p className="price">$4.50</p>
              </div>
              <div className="qty-control">
                <button type="button" className="qty-btn" onClick={removeMochaCount}>-</button>
                <span className="qty">{mochaCount}</span>
                <button type="button" className="qty-btn" onClick={addMochaCount}>+</button>
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
                <span className="qty">{coldBrewCount}</span>
                <button type="button" className="qty-btn">+</button>
              </div>
              <button type="button" className="add-btn">Add to cart</button>
            </article>
          </div>
        </div>

        <div className="cart">
          <h2>Your cart</h2>
          <ul className="cart-list">
            {cart.map((line, index) => (
              <li className="cart-item" key={index}>
                <span className="cart-item-name">{line.name}</span>
                <span className="cart-item-qty">x{line.qty}</span>
                <span className="cart-item-price">${(line.price * line.qty).toFixed(2)}</span>
                <button type="button" className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
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

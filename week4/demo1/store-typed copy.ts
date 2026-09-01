import { CartItem, addItem } from "./store-typed";

var item: CartItem = {
  name: "Hi",
  price: 1.5,
  qty: 1
};

addItem(item.name, item.price, item.qty);
import { addItem } from "./store-typed";
var item = {
    name: "Hi",
    price: 1.5,
    qty: 1
};
addItem(item.name, item.price, item.qty);

// express.json() reads JSON bodies onto req.body -- and it has to come before the routes.
const express = require("express");
const app = express();
const menu = [{ id: 1, name: "Espresso", price: 2.5 }, { id: 2, name: "Latte", price: 4 }];

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());

app.get("/api/menu", (req, res) => {
  res.json(menu);
});

app.get("/api/menu/:id", (req, res) => {
  const drink = menu.find((d) => d.id === Number(req.params.id));
  if (!drink) {
    return res.status(404).json({ error: `No drink with id ${req.params.id}` });
  }
  res.json(drink);
});

app.post("/api/menu", (req, res) => {
  const name = req.body.name;
  res.status(201).json({ name });
});

app.listen(4000, () => console.log("Menu API on http://localhost:4000"));

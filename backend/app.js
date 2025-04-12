import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("./images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/users", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);
  res.status(200).json({ users });
});

// rotas de menu
app.get("/menu", async (req, res) => {
  const fileContent = await fs.readFile("./data/menu.json");
  const users = JSON.parse(fileContent);
  res.status(200).json({ users });
});
app.post("/create-menu", async (req, res) => {
  const fileContent = await fs.readFile("./data/menu.json", "utf-8");
  const menu = JSON.parse(fileContent);

  const newMenu = req.body;
  menu.push(newMenu);

  await fs.writeFile("./data/menu.json", JSON.stringify(menu, null, 2));
  res.status(200).json({ message: "Menu Item Inserted!" });
});

// rotas de pedidos
app.post("/order", async (req, res) => {
  const fileContent = await fs.readFile("./data/orders.json", "utf-8");
  const orders = JSON.parse(fileContent);

  const newOrder = req.body;
  orders.push(newOrder);

  await fs.writeFile("./data/menu.json", JSON.stringify(orders, null, 2));
  res.status(200).json({ message: "Order Inserted!" });
});
app.get("/orders", async (req, res) => {
  const fileContent = await fs.readFile("./data/orders.json");
  const orders = JSON.parse(fileContent);
  res.status(200).json({ orders });
});

//rotas de users
//rota de registo
app.post("/signup", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json", "utf-8");
  const users = JSON.parse(fileContent);

  const newUser = req.body;
  users.push(newUser);

  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
  res.status(200).json({ message: "User Inserted!" });
});

//rota de login (verifica se há user e se sim gera um token)
app.post("/login", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  const users = JSON.parse(fileContent);

  const email = req.body.email;
  const password = req.body.password;

  const login = users.find((u) => u.email === email && u.password === password);

  if (!login) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const AuthUser = {
    firstName: login.firstName,
    lastName: login.lastName,
    role: login.role,
  };

  res.json(AuthUser);
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

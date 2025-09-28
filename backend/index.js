require("dotenv").config();
const cors = require("cors");

const express = require("express");
const { MongoClient } = require("mongodb");
const authRoutes = require("./routes/auth");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

const client = new MongoClient(process.env.MONGO_URI);
const productsRouter = require("./routes/Products");
app.use("/products", productsRouter);

const transactionsRouter = require("./routes/transactions");
app.use("/transactions", transactionsRouter);


async function connectDB() {
  try {
    await client.connect();
    app.locals.db = client.db("financeApp");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
}
connectDB();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

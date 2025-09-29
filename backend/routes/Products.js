const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  const products = await db.collection("products").find({}).toArray();
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const { ObjectId } = require("mongodb");

  try {
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.chartData = [
      { date: "2025-09-01", value: product.price * 0.95 },
      { date: "2025-09-05", value: product.price * 1.05 },
      { date: "2025-09-10", value: product.price },
    ];

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid product ID" });
  }
});

module.exports = router;

const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const { ObjectId } = require("mongodb");

router.post("/buy", authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { productId, units } = req.body;
    const userId = req.user.userId;

    if (!productId || !units) return res.status(400).json({ error: "Product ID and units required" });

    const product = await db.collection("products").findOne({ _id: new ObjectId(productId) });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const users = db.collection("users");
    const user = await users.findOne({ _id: new ObjectId(userId) });
    if (!user.wallet) user.wallet = 100000; 

    const totalPrice = product.price * units;
    if (user.wallet < totalPrice) return res.status(400).json({ error: "Insufficient balance" });

    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $inc: { wallet: -totalPrice } }
    );

    
    const transaction = {
      userId,
      productId,
      productName: product.name,
      units,
      pricePerUnit: product.price,
      totalPrice,
      date: new Date(),
    };
    await db.collection("transactions").insertOne(transaction);

    res.json({ message: "Purchase successful", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/portfolio", authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user.userId;

    const transactions = await db.collection("transactions").find({ userId }).toArray();
    if (!transactions.length) return res.json({ message: "No transactions yet", portfolio: [] });

    const portfolioMap = {};
    let totalInvested = 0;

    for (const tx of transactions) {
      totalInvested += tx.totalPrice;
      if (!portfolioMap[tx.productId]) {
        portfolioMap[tx.productId] = { productName: tx.productName, units: 0, pricePerUnit: tx.pricePerUnit };
      }
      portfolioMap[tx.productId].units += tx.units;
    }

    const portfolio = [];
    for (const pid in portfolioMap) {
      const p = portfolioMap[pid];
      const product = await db.collection("products").findOne({ _id: new ObjectId(pid) });
      const currentValue = product.price * p.units;
      const returns = currentValue - (p.units * p.pricePerUnit);
      portfolio.push({ ...p, currentValue, returns });
    }

    res.json({ totalInvested, portfolio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


});

router.post("/watchlist/add", authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { productId } = req.body;
    const userId = req.user.userId;

    if (!productId) return res.status(400).json({ error: "Product ID required" });

    const users = db.collection("users");

    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { watchlist: productId } }
    );

    res.json({ message: "Product added to watchlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/watchlist/remove", authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { productId } = req.body;
    const userId = req.user.userId;

    if (!productId) return res.status(400).json({ error: "Product ID required" });

    const users = db.collection("users");

    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { watchlist: productId } }
    );

    res.json({ message: "Product removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user's watchlist
router.get("/watchlist", authenticateToken, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user.userId;

    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    const watchlistIds = user.watchlist || [];

    const products = await db.collection("products")
      .find({ _id: { $in: watchlistIds.map(id => new ObjectId(id)) } })
      .toArray();

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

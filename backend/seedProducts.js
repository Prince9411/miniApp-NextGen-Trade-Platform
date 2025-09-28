const { MongoClient } = require("mongodb");
require("dotenv").config();

const products = [
  { name: "Stock A", category: "Stock", price: 1200, peRatio: 15.2 },
  { name: "Stock B", category: "Stock", price: 800, peRatio: 18.5 },
  { name: "Mutual Fund X", category: "Mutual Fund", price: 500, peRatio: 20.1 },
  { name: "Mutual Fund Y", category: "Mutual Fund", price: 750, peRatio: 22.7 },
  { name: "Stock C", category: "Stock", price: 1500, peRatio: 12.9 },
];

async function seed() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db("financeApp");
    const collection = db.collection("products");

    await collection.deleteMany({}); // clean old data
    const result = await collection.insertMany(products);
    console.log(`Inserted ${result.insertedCount} products`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();

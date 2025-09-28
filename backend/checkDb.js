require("dotenv").config();
const { MongoClient } = require("mongodb");

async function checkDB() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db("financeApp");

    console.log("✅ Connected to financeApp");

    const collections = await db.listCollections().toArray();
    console.log("\nCollections in financeApp:");
    collections.forEach((c) => console.log(" -", c.name));

    for (const c of collections) {
      const docs = await db.collection(c.name).find().toArray();
      console.log(`\nDocuments in collection '${c.name}':`);
      console.log(docs);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

checkDB();

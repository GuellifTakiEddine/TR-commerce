const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const url = "mongodb://takiguellif12:takiranim@ac-cvhld6x-shard-00-00.6iskzez.mongodb.net:27017,ac-cvhld6x-shard-00-01.6iskzez.mongodb.net:27017,ac-cvhld6x-shard-00-02.6iskzez.mongodb.net:27017/TR?ssl=true&replicaSet=atlas-pgklbr-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("TR");
    const users = db.collection("users");
    const products = db.collection("products");
    const test = await products.find({}).toArray();


    const wishlist = db.collection("wishlist");

    // --- ROUTES START HERE ---
    app.get("/test", (req, res) => res.json({ ok: true }));

    // ✅ Fetch all products
    app.get("/products", async (req, res) => {
      try {
        const all = await products.find({}).toArray();
        res.json(all);
      } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Something went wrong");
      }
    });

    // ✅ Create Account
    app.post("/create-account", async (req, res) => {
      try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password)
          return res.status(400).json({ error: "All fields are required" });

        const existingUser = await users.findOne({ email });
        if (existingUser)
          return res.status(400).json({ error: "Email already in use" });

        const passwordHash = await bcrypt.hash(password, 10);
        await users.insertOne({
          name,
          email,
          phone,
          passwordHash,
          createdAt: new Date(),
        });

        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        console.error("Error inside /create-account:", err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // ✅ Login
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).json({ error: "Email and password required" });

        const user = await users.findOne({ email });
        if (!user)
          return res.status(401).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch)
          return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign(
          { id: user._id, email: user.email },
          "YOUR_SECRET_KEY",
          { expiresIn: "7d" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.json({
  message: "Login successful",
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
});
      } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // ✅ Add to Wishlist
    app.post("/wishlist", async (req, res) => {
      try {
        const { userId, productId } = req.body;
        console.log("📥 Wishlist request body:", req.body);


        if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId))
          return res.status(400).json({ error: "Invalid IDs" });

        const existing = await wishlist.findOne({
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
        });

        if (existing)
          return res.status(400).json({ error: "Product already in wishlist" });

        const newWish = {
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
          dateAdded: new Date(),
        };

        await wishlist.insertOne(newWish);
        res.status(201).json({ message: "Added to wishlist", wishlistItem: newWish });
      } catch (err) {
        console.error("Error adding to wishlist:", err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // ✅ Get Wishlist
    app.get("/wishlist/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!ObjectId.isValid(userId))
          return res.status(400).json({ error: "Invalid userId format" });

        const items = await wishlist.find({ userId: new ObjectId(userId) }).toArray();
        if (items.length === 0) return res.json([]);

        const productIds = items.map((item) => item.productId);
        const wishedProducts = await products.find({ _id: { $in: productIds } }).toArray();

        res.json(wishedProducts);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // ✅ Remove from Wishlist
    app.delete("/wishlist/:userId/:productId", async (req, res) => {
      try {
        const { userId, productId } = req.params;

        if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId))
          return res.status(400).json({ error: "Invalid IDs" });

        const result = await wishlist.deleteOne({
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
        });

        if (result.deletedCount === 0)
          return res.status(404).json({ error: "Wishlist item not found" });

        res.json({ message: "Removed from wishlist" });
      } catch (err) {
        console.error("Error removing from wishlist:", err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // --- SERVER START ---
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB", err);
  }
})();

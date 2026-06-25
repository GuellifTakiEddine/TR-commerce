const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================
// MONGODB
// =====================
const url =
  "mongodb+srv://takiguellif12:takiranim@trcommerce.6iskzez.mongodb.net/TR?retryWrites=true&w=majority";

const client = new MongoClient(url);

// =====================
// START SERVER
// =====================
(async () => {
  try {
    await client.connect();

    console.log("✅ MongoDB Connected");

    const db = client.db("TR");

    const users = db.collection("users");
    const products = db.collection("products");
    const wishlist = db.collection("wishlist");
    const cart = db.collection("cart");

    // ====================================================
    // TEST
    // ====================================================
    app.get("/test", (req, res) => {
      res.json({
        message: "Server working",
      });
    });

    // ====================================================
    // GET PRODUCTS
    // ====================================================
    app.get("/products", async (req, res) => {
      try {
        const data = await products.find().toArray();

        res.json(data);
      } catch (err) {
        console.log(err);

        res.status(500).json({
          error: "Failed to fetch products",
        });
      }
    });

    // ====================================================
    // CREATE ACCOUNT
    // ====================================================
    app.post("/create-account", async (req, res) => {
      try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
          return res.status(400).json({
            error: "All fields required",
          });
        }

        const existingUser = await users.findOne({ email });

        if (existingUser) {
          return res.status(400).json({
            error: "Email already exists",
          });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await users.insertOne({
          name,
          email,
          phone,
          passwordHash,
          createdAt: new Date(),
        });

        res.json({
          message: "Account created",
        });

      } catch (err) {
        console.log(err);

        res.status(500).json({
          error: "Create account error",
        });
      }
    });

    // ====================================================
    // LOGIN
    // ====================================================
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
          return res.status(401).json({
            error: "Invalid email",
          });
        }

        const isMatch = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isMatch) {
          return res.status(401).json({
            error: "Invalid password",
          });
        }

        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          "SECRET_KEY",
          {
            expiresIn: "7d",
          }
        );

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
          message: "Login success",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        });

      } catch (err) {
        console.log(err);

        res.status(500).json({
          error: "Login error",
        });
      }
    });

    // ====================================================
    // ADD TO WISHLIST
    // ====================================================
    app.post("/wishlist", async (req, res) => {
      try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
          return res.status(400).json({
            error: "Missing data",
          });
        }

        const existing = await wishlist.findOne({
          userId: new ObjectId(userId),
          productId: productId,
        });

        if (existing) {
          return res.json({
            message: "Already in wishlist",
          });
        }

        await wishlist.insertOne({
          userId: new ObjectId(userId),
          productId: productId,
          createdAt: new Date(),
        });

        res.json({
          message: "Added to wishlist",
        });

      } catch (err) {
        console.log(err);

        res.status(500).json({
          error: "Wishlist error",
        });
      }
    });

    // ====================================================
    // GET WISHLIST
    // ====================================================
    app.get("/wishlist/:userId", async (req, res) => {
      try {
        const uid = new ObjectId(req.params.userId);

        const items = await wishlist.find({
          userId: uid,
        }).toArray();

const result = await Promise.all(
  items.map(async (item) => {
    const product = await products.findOne({
      _id: new ObjectId(item.productId),
    });

    return product;
  })
);

        res.json(result);

      } catch (err) {
        console.log(err);

        res.status(500).json({
          error: "Wishlist fetch error",
        });
      }
    });

    // ====================================================
    // REMOVE FROM WISHLIST
    // ====================================================
    app.delete("/wishlist/:userId/:productId", async (req, res) => {
      try {
        const { userId, productId } = req.params;

        await wishlist.deleteOne({
          userId: new ObjectId(userId),
          productId: productId,
        });

        res.json({
          message: "Removed from wishlist",
        });

      } catch (err) {
        console.log(err);

        res.status(500).json({
          error: "Wishlist delete error",
        });
      }
    });

    // =====================
// ADD TO CART (FIXED)
// =====================
app.post("/cart", async (req, res) => {
  try {
    const { userId, productId, quantity, size, color } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "Missing data" });
    }

    const uid = new ObjectId(userId);
    const pid = new ObjectId(productId);

    const existing = await cart.findOne({
      userId: uid,
      productId: pid,
    });

    if (existing) {
      await cart.updateOne(
        { _id: existing._id },
        { $inc: { quantity: Number(quantity) || 1 } }
      );

      return res.json({ message: "Cart updated" });
    }

    await cart.insertOne({
      userId: uid,
      productId: pid,
      quantity: Number(quantity) || 1,
      size: size || "M",
      color: color || "default",
      createdAt: new Date(),
    });

    res.json({ message: "Added to cart" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cart error" });
  }
});
    app.get("/cart/:userId", async (req, res) => {
  try {
    const uid = new ObjectId(req.params.userId);

    const items = await cart.find({ userId: uid }).toArray();

    const result = await Promise.all(
      items.map(async (item) => {
        const product = await products.findOne({
          _id: new ObjectId(item.productId),
        });

        return {
          ...item,
          product,
        };
      })
    );

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "GET CART ERROR" });
  }
});

    // ====================================================
    // DELETE CART ITEM
    // ====================================================
    app.delete("/cart/:id", async (req, res) => {
      try {
        await cart.deleteOne({
          _id: new ObjectId(req.params.id),
        });

        res.json({
          message: "Item removed",
        });

      } catch (err) {
        console.log(err);

        res.status(500).json({
          error: "Delete cart error",
        });
      }
    });

    //
    const orders = db.collection("orders");

// =====================
// CREATE ORDER
// =====================
app.post("/orders", async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing data" });
    }

    const result = await orders.insertOne({
      userId: new ObjectId(userId),
      items,
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    });

    res.json({
      message: "Order created",
      orderId: result.insertedId,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Order create error" });
  }
});

// =====================
// GET ORDER (TRACKING)
// =====================
app.post("/orders", async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing data" });
    }

    const result = await orders.insertOne({
      userId: new ObjectId(userId),
      items,
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    });

    res.json({
      message: "Order created",
      orderId: result.insertedId.toString(),
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Order create error" });
  }
});
//GET ORDERS BY USER
app.get("/orders/user/:userId", async (req, res) => {
  try {
    const uid = new ObjectId(req.params.userId);

    const ordersList = await orders
      .find({ userId: uid })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(ordersList);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Orders fetch error" });
  }
});
//remove order in account(orders)
app.delete("/orders/:id", async (req, res) => {
  try {
    const result = await orders.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete order error" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await products.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.json(product);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
});




    // ====================================================
    // SERVER
    // ====================================================
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });

  } catch (err) {
    console.log("❌ MongoDB connection error", err);
  }
})();
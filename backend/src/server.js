const express=require('express');
const {MongoClient}=require('mongodb');
const cors=require('cors');

const app=express();
const PORT=5000;

app.use(cors());
app.use(express.json());
const url = "mongodb://takiguellif12:takiranim@ac-cvhld6x-shard-00-00.6iskzez.mongodb.net:27017,ac-cvhld6x-shard-00-01.6iskzez.mongodb.net:27017,ac-cvhld6x-shard-00-02.6iskzez.mongodb.net:27017/TR?ssl=true&replicaSet=atlas-pgklbr-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(url);


app.get('/products',async (req,res)=>{
try{
await client.connect();
const db=client.db("TR");
const products=await db.collection("products").find({}).toArray();
res.json(products);


}catch(err){
console.error(err);
res.status(500).send("Something went wrong");

}
});

app.post('/create-account', async (req, res) => {
  try {
    console.log("Request body:", req.body);  // <-- log incoming data
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("TR");
    const users = db.collection("users");
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      console.error("Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await users.findOne({ email });
    console.log("Existing user:", existingUser);

    if (existingUser) {
      console.error("Email already in use");
      return res.status(400).json({ error: "Email already in use" });
    }

    const bcrypt = require('bcrypt');
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const result = await users.insertOne({
      name,
      email,
      phone,
      passwordHash,
      createdAt: new Date()
    });
    console.log("Insert result:", result);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error inside /create-account:", err);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT,()=>{
    console.log(`backend running on http://localhost:${PORT}`);
});
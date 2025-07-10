const express=require('express');
const {MongoClient}=require('mongodb');
const cors=require('cors');

const app=express();
const PORT=5000;

app.use(cors());
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

app.listen(PORT,()=>{
    console.log(`backend running on http://localhost:${PORT}`);
});
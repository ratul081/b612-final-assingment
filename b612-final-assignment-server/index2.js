const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// Middleware
app.use(cors());
app.use(express.json());
require("colors");

// Database URI
const uri = `${process.env.DB_URL}`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function dbConnect() {
  try {
    await client.connect();
    console.log("Database connected".yellow);
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold);
  }
}
dbConnect();

// JWT middleware function
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("🚀 ~ verifyJWT ~ authHeader:", authHeader)
  if (!authHeader) {
    return res.status(403).send("Unauthorized access");
  }

  const token = authHeader.split(" ")[1];
  console.log("🚀 ~ verifyJWT ~ token:", token)
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    const database = client.db("b612-resale-product-assignment_db");
    const usersCollection = database.collection("users");
    const cartCollection = database.collection("carts");
    const productsCollection = database.collection("products");
    const blogCollection = database.collection("questionAndAnswer");
    const paymentsCollection = database.collection("payments");

    // Authentication Endpoints

    // JWT access token
    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { user_email: email };
      const user = await usersCollection.findOne(query);
      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_SECRET_TOKEN, {
          expiresIn: "6h",
        });
        return res.send({ accessToken: token });
      }
      console.log(user);
      res.status(403).send({ accessToken: "" });
    });

    // Middleware to verify admin
    const verifyAdmin = async (req, res, next) => {
      const decodedEmail = req.decoded.email;
      console.log("🚀 ~ verifyAdmin ~ decodedEmail:", decodedEmail)
      const query = { user_email: decodedEmail };
      console.log("🚀 ~ verifyAdmin ~ query:", query)
      const user = await usersCollection.findOne(query);
      console.log("🚀 ~ verifyAdmin ~ user:", user)
      if (user?.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // Payment Endpoints

    // Payment method implementation
    app.post("/create-payment-intent", async (req, res) => {
      const booking = req.body;
      const price = booking.price;
      const amount = parseInt(price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // User Endpoints

    // Get method for checking admin in useAdmin hook
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user_email: email };
      const user = await usersCollection.findOne(query);
      res.send({ isAdmin: user?.role === "admin" });
    });

    // Get method for checking seller in useSeller hook
    app.get("/users/seller/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user_email: email };
      const user = await usersCollection.findOne(query);
      res.send({ isSeller: user?.user_accountType === "Seller" });
    });

    // Get method for checking buyer in useBuyer hook
    app.get("/users/buyer/:email", async (req, res) => {
      const email = req.params.email;
      const query = { user_email: email };
      const user = await usersCollection.findOne(query);
      res.send({ isBuyer: user?.user_accountType === "Buyer" });
    });

    // Get all users
    app.get("/all-users", async (req, res) => {
      const query = {};
      const allUser = await usersCollection.find(query).toArray();
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: allUser,
      });
    });

    // Add new user
    app.post("/add-user", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Delete user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(filter);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Update user role to admin
    app.put("/users/admin/:id", verifyJWT, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      console.log("🚀 ~ app.put ~ id:", id)
      const filter = { _id: new ObjectId(id) };
      console.log("🚀 ~ app.put ~ filter:", filter)
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc, options);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Verify seller
    app.put("/users/verify/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          verified: true,
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc, options);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Product Endpoints

    // Get a product by ID
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const productsById = await productsCollection.findOne(query);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: productsById,
      });
    });
    // Get a product by category
    app.get("/products-category/:category", async (req, res) => {
      const category = req.params.category;
      const query = { product_category: category };
      const productsByCategory = await productsCollection.find(query).toArray();
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: productsByCategory,
      });
    });

    // Get products by email
    app.get("/products-email/:email", async (req, res) => {
      const email = req.params.email;
      const query = { product_email: email };
      const cursor = productsCollection.find(query);
      const productsByEmail = await cursor.toArray();
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: productsByEmail,
      });
    });

    // Get all products for advertising in home
    app.get("/products", async (req, res) => {
      const query = {};
      const products = await productsCollection.find(query).toArray();
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: products,
      });
    });

    // Add new product
    app.post("/add-product", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Delete a product by ID
    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(filter);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Mark a product as advertised
    app.put("/product/add/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ad: true,
        },
      };
      const result = await productsCollection.updateOne(filter, updateDoc, options);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });
    // Question and Answer Endpoints

    // Get all questions and answers
    app.get("/questions", async (req, res) => {
      const query = {};
      const result = await blogCollection.find(query).toArray();
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Cart Endpoints

    // Get all booking items by email
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { buyer_email: email };
      const booking = await cartCollection.find(query).toArray();
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: booking,
      });
    });

    // Get booking item by ID
    app.get("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.findOne(query);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Add new booking item
    app.post("/carts", async (req, res) => {
      const booking = req.body;
      const result = await cartCollection.insertOne(booking);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Delete booking item by ID
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

    // Order Endpoints

    // Get all orders by email
    app.get("/orders", async (req, res) => {
      const email = req.query.email;
      const query = { buyer_email: email };
      const booking = await cartCollection.find(query).toArray();
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: booking,
      });
    });

    // Payment Endpoints

    // Add payment information
    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      const id = payment.bookingId;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId,
        },
      };
      const updateResult = await cartCollection.updateOne(filter, updateDoc);
      res.send({
        status: true,
        massage: "Successfully got the data",
        data: result,
      });
    });

  } finally {
    // Ensuring that the client will close when you finish/error
  }
}
run().catch(console.error);

// Root endpoint
app.get("/", async (req, res) => {
  res.send("Resale products running");
});

// Start server
app.listen(port, () => {
  console.log(`Resale products running on port: ${port}`);
});

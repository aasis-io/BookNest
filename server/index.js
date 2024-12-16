const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables (Move sensitive data to `.env` in production)
const JWT_SECRET = process.env.JWT_SECRET; // Ensure it’s set in .env
const MONGO_URI = process.env.MONGO_URI; // Ensure it’s set in .env

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware for User Authentication
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>
  if (!token)
    return res
      .status(401)
      .send({ message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token." });
  }
};

// Middleware for Admin Authorization
// Middleware to authorize only admin users
const authorizeAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);

    // Check if the role is 'admin'
    if (decoded?.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins only." });
    }

    // Token is valid and role is 'admin'
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("BookInventory");
    const bookCollection = db.collection("books");
    const userCollection = db.collection("users");
    const cartCollection = db.collection("cart");
    const adminCollection = db.collection("admins");

    app.get("/search", async (req, res) => {
      try {
        const query = req.query.q || "";
        console.log("Search Query:", query);

        if (!query.trim()) {
          return res.json([]); // Handle empty search gracefully
        }

        const books = await bookCollection
          .find({
            bookTitle: { $regex: query, $options: "i" },
          })
          .toArray();

        // const books = await bookCollection
        //   .find({
        //     bookTitle: { $regex: "Weyward1", $options: "i" }, // Replace "test" with a known title substring
        //   })
        //   .toArray();
        console.log("Books Found (Hardcoded):", books);
        console.log("Books Found:", books);
        res.json(books);
      } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books" });
      }
    });

    app.post("/register/admin", async (req, res) => {
      try {
        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the admin already exists
        const existingAdmin = await adminCollection.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ message: "Admin already exists." });
        }

        // Hash the password securely using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert admin details into the database
        const result = await adminCollection.insertOne({
          name,
          email,
          password: hashedPassword,
          role: "admin",
        });

        // Send success response
        return res.status(201).json({
          message: "Admin registered successfully.",
          adminId: result.insertedId,
        });
      } catch (err) {
        console.error("Error during admin registration:", err);
        return res.status(500).json({ message: "Internal server error." });
      }
    });

    // Admin Login Route
    // Admin Login Route
    app.post("/login/admin", async (req, res) => {
      const { email, password } = req.body;

      try {
        const admin = await adminCollection.findOne({ email });
        if (!admin) {
          return res
            .status(400)
            .send({ message: "Invalid email or password." });
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
          return res
            .status(400)
            .send({ message: "Invalid email or password." });
        }

        // Generate token only for admin
        const token = jwt.sign({ _id: admin._id, role: "admin" }, JWT_SECRET, {
          expiresIn: "1d",
        });

        const { password: _, ...adminDetails } = admin; // Remove password from admin details
        res.json({ token, admin: adminDetails });
      } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    // User Registration
    app.post("/register", async (req, res) => {
      try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
          return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userCollection.insertOne({
          name,
          email,
          password: hashedPassword,
          role,
        });

        res.status(201).json({
          message: "User registered successfully.",
          userId: result.insertedId,
        });
      } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Internal server error." });
      }
    });

    // User Login
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await userCollection.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .send({ message: "Invalid email or password." });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res
            .status(400)
            .send({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
          expiresIn: "1d",
        });

        const { password: _, ...userDetails } = user;

        res.json({ token, user: userDetails });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    // Add Book (Admins Only)
    // app.post("/upload-book", authenticate, authorizeAdmin, async (req, res) => {
    //   try {
    //     const result = await bookCollection.insertOne(req.body);
    //     res.status(201).send(result);
    //   } catch (error) {
    //     console.error("Error uploading book:", error);
    //     res.status(500).send({ message: "Internal server error." });
    //   }
    // });

    // Configure multer for file uploads
    // Setup Multer

    // Configure multer for file uploads
    const upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, "uploads"));
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg"
        ) {
          cb(null, true);
        } else {
          cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"), false);
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit
      },
    });

    // Book Upload Route
    app.post(
      "/upload-book",
      authenticate,
      authorizeAdmin,
      upload.single("coverImage"),
      async (req, res) => {
        try {
          console.log("Request body:", req.body);
          console.log("Uploaded file details:", req.file);

          if (!req.file) {
            return res
              .status(400)
              .send({ message: "Cover image not uploaded." });
          }

          const coverImagePath = `/uploads/${req.file.filename}`;
          console.log("Cover image path:", coverImagePath);

          const result = await bookCollection.insertOne({
            bookTitle: req.body.bookTitle,
            authorName: req.body.authorName,
            bookPrice: req.body.bookPrice,
            category: req.body.category,
            bookDescription: req.body.bookDescription,
            coverImage: coverImagePath,
          });

          res.status(201).json({
            message: "Book uploaded successfully.",
            bookId: result.insertedId,
            coverImagePath,
          });
        } catch (error) {
          console.error("Error during book upload:", error);
          res.status(500).send({ message: "Internal server error" });
        }
      }
    );

    app.use(
      "/uploads",
      cors(), // Allow image serving from the server's uploads endpoint
      express.static(path.join(__dirname, "uploads"))
    );

    // Get All Books
    app.get("/all-books", async (req, res) => {
      try {
        const query = req.query?.category
          ? { category: req.query.category }
          : {};
        const books = await bookCollection.find(query).toArray();
        res.send(books);
      } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    // Get Single Book - No Authentication Required
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const filter = { _id: new ObjectId(id) };
        const book = await bookCollection.findOne(filter);

        if (!book) {
          return res.status(404).send("Book not found");
        }

        res.send(book);
      } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send("Internal server error");
      }
    });

    // Update Book (Admins Only)
    app.patch(
      "/book/:id",
      authenticate,
      authorizeAdmin,
      upload.single("coverImage"), // Handle optional file upload
      async (req, res) => {
        try {
          const bookId = new ObjectId(req.params.id);

          // Fetch current book details to check for the existing cover image
          const book = await bookCollection.findOne({ _id: bookId });
          console.log("Current book details:", book);

          // Log request body to confirm fields are received
          console.log("Request body:", req.body);

          // Prepare the updated fields
          const updatedFields = {
            bookTitle: req.body.bookTitle,
            authorName: req.body.authorName,
            bookPrice: req.body.bookPrice,
            category: req.body.category,
            bookDescription: req.body.bookDescription,
          };

          // Handle the new cover image if uploaded
          if (req.file) {
            const newCoverImagePath = `/uploads/${req.file.filename}`;

            console.log("New Cover Image Path:", newCoverImagePath);

            // Cleanup old image if exists
            if (book && book.coverImage) {
              const oldImagePath = path.join(__dirname, book.coverImage);
              fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Error while deleting old image:", err);
              });
            }

            updatedFields.coverImage = newCoverImagePath;
          }

          console.log("Updated fields to be sent to DB:", updatedFields);

          // Update the book entry
          const result = await bookCollection.updateOne(
            { _id: bookId },
            { $set: updatedFields }
          );

          console.log("Update result:", result);

          if (result.matchedCount > 0) {
            res
              .status(200)
              .json({ message: "Book updated successfully", result });
          } else {
            res.status(404).json({ message: "Book ID not found in database." });
          }
        } catch (error) {
          console.error("Error updating book:", error);
          res.status(500).json({ message: "Internal server error." });
        }
      }
    );

    // Delete Book (Admins Only)
    app.delete("/book/:id", authenticate, authorizeAdmin, async (req, res) => {
      try {
        const bookId = new ObjectId(req.params.id);

        // Attempt to delete the book
        const result = await bookCollection.deleteOne({ _id: bookId });

        if (result.deletedCount === 0) {
          // No document was deleted; book not found
          return res
            .status(404)
            .send({ message: "Book not found or already deleted." });
        }

        // Successful deletion
        res.status(200).send({ message: "Book deleted successfully." });
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    // CART

    // Add to Cart
    app.post("/api/cart/add", authenticate, async (req, res) => {
      const { bookId, quantity } = req.body;

      if (!bookId || quantity === undefined) {
        return res
          .status(400)
          .send({ message: "Book ID and quantity are required." });
      }

      try {
        // Ensure bookId is an ObjectId
        const bookObjectId = new ObjectId(bookId);
        const book = await bookCollection.findOne({
          _id: bookObjectId,
        });

        if (!book) {
          return res.status(404).send({ message: "Book not found." });
        }

        const userId = req.user._id; // Assuming `req.user._id` is already an ObjectId from JWT or session.

        // Ensure userId is an ObjectId
        const userObjectId = new ObjectId(userId);

        // Check if the user already has this book in their cart
        const existingCartItem = await cartCollection.findOne({
          userId: userObjectId,
          bookId: bookObjectId,
        });

        if (existingCartItem) {
          // If the book is already in the cart, update the quantity
          await cartCollection.updateOne(
            { _id: existingCartItem._id },
            { $set: { quantity: existingCartItem.quantity + quantity } }
          );
          return res.send({ message: "Cart updated successfully." });
        }

        // If the book is not already in the cart, add a new item
        await cartCollection.insertOne({
          userId: userObjectId,
          bookId: bookObjectId,
          quantity,
        });
        res.status(201).send({ message: "Book added to cart." });
      } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    // Get Cart Items
    app.get("/api/cart/list", authenticate, async (req, res) => {
      const userId = req.user._id; // Getting user ID from JWT payload
      console.log("User ID:", userId); // Log the userId to ensure it's correct

      try {
        const cartItems = await cartCollection
          .aggregate([
            { $match: { userId: new ObjectId(userId) } }, // Ensure correct ObjectId matching
            {
              $lookup: {
                from: "books", // Lookup the book details
                localField: "bookId", // Matching bookId in the cart
                foreignField: "_id", // Matching _id in the books collection
                as: "bookDetails", // Store the result in bookDetails array
              },
            },
            { $unwind: "$bookDetails" }, // Unwind the bookDetails array
            {
              $lookup: {
                from: "users", // Lookup the user details
                localField: "userId", // Matching userId in the cart
                foreignField: "_id", // Matching _id in the users collection
                as: "userDetails", // Store the result in userDetails array
              },
            },
            { $unwind: "$userDetails" }, // Unwind the userDetails array
          ])
          .toArray();

        console.log("Cart Items:", cartItems); // Log the cart items to debug

        res.send(cartItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    // Remove from Cart
    app.delete("/api/cart/remove/:id", authenticate, async (req, res) => {
      const cartItemId = req.params.id;

      try {
        const result = await cartCollection.deleteOne({
          _id: new ObjectId(cartItemId),
        });
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Cart item not found." });
        }
        res.send({ message: "Item removed from cart." });
      } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    ////////Update
    app.put("/api/cart/update/:cartItemId", authenticate, async (req, res) => {
      const { cartItemId } = req.params; // Cart item ID from the URL
      const { quantity } = req.body; // New quantity from the request body

      try {
        // Validate quantity
        if (quantity < 1) {
          return res
            .status(400)
            .json({ message: "Quantity must be at least 1" });
        }

        // Convert cartItemId to ObjectId
        const cartItemObjectId = new ObjectId(cartItemId);

        // Update the cart item in the database
        const result = await cartCollection.updateOne(
          { _id: cartItemObjectId }, // Find the cart item by ID
          { $set: { quantity } } // Update the quantity
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Cart item not found." });
        }

        res.json({ message: "Cart item updated successfully." });
      } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: "Failed to update cart item." });
      }
    });

    // Catch-All for Undefined Routes
    app.all("*", (req, res) => {
      res.status(404).send({ message: "Route not found." });
    });

    // MongoDB Ping Check
    await client.db("admin").command({ ping: 1 });
    console.log("Ping to MongoDB successful!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

// Start MongoDB and Server
run().catch(console.error);

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

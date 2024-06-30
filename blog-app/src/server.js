const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blog = require("./model/blog");
const User = require("./model/user");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Authentication routes
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// CRUD routes
app.get("/blogs", authenticateToken, async (req, res) => {
  const blogs = await Blog.find({ author: req.user.id });
  res.json(blogs);
});

app.post("/blogs", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({ title, content, author: req.user.id });
  await blog.save();
  res.status(201).json(blog);
});

app.listen(5000, () => console.log("Server running on port 5000"));

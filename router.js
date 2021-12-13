const express = require("express");

const Post = require("./models/Post");

const Blog = require("./models/Blog");

const Test = require("./models/Test");

const Users = require("./models/User");

const passwordHash = require("password-hash");
const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Post.find();
  //console.log("products", products);

  res.send(products);
});

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  console.log("blogs", blogs);

  res.send(blogs);
});

router.post("/color", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  // console.log("Posts", post);
  await post.save();
  res.send(post);
});

router.get("/products/:id", async (req, res) => {
  try {
    console.log("reqID", req.params);
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});
router.post("/register", async (req, res) => {
  console.log(req.body);
  const hashedPassword = passwordHash.generate(req.body?.password);
  console.log("hashedpassword: ", hashedPassword);
  res.json({ status: "ok" });
});
module.exports = router;

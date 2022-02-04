const express = require("express");

const Post = require("./models/Post");

const Blog = require("./models/Blog");

const Test = require("./models/Test");

const Users = require("./models/User");

const passwordHash = require("password-hash");

const validator = require("email-validator");

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

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await Users.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username or password" });
  }

  if (password === user.password) {
    return res.json({ status: "ok", data: "" });
  }

  res.json({ status: "error", error: "Invalid username or password" });
});

// Register API
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password, checked } = req.body;
  const hashedPassword = passwordHash.generate(password);

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (!password || typeof password !== "string") {
    return res.json({ status: "error", error: "invalid password" });
  }
  if (validator.validate(email)) {
    try {
      const response = await Users.create({
        email,
        password,
        checked,
      });
      console.log("User created successfully:", response);
      return res.json({ status: "success" });
    } catch (err) {
      if (err.code === 11000) {
        // duplicate key
        console.log(res.statusCode, res.statusMessage);
        return res.json({ status: "error", err: "Username already in use" });
      }
      throw err;
    }
  } else {
    console.log("this is not email address");
  }
});

// forget password router link

router.put("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  Users.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exists. " });
    }
  });


  // send html link to user email 

  const data = {
    from :'furnitureapp@gmail.com',
    to: email,
    subject:'Account Activation Link',
    html:`
      <h2>Please click on given link to reset your password</h2>
      `
  };

  return user.updateOne((err,success){
    if(err){
      return res.status(400).json({error:'Reset password link error'})
    }else{
      mg.statusMessage().send(data,function(error,body){
        if(error){
          return res.json({
            error:err.message
          })
        }

        return res.json({message:'Email has been sent,kindly follow the instructions'})
      })
    }
  })
});
module.exports = router;

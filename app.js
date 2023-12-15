const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const {
  problems_retrieve,
  problem_delete,
} = require("./controllers/favouriteController");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const dbURI = `mongodb://localhost:27017`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/friends", requireAuth, (req, res) => res.render("page"));

app.get("/favourites", requireAuth, async (req, res) => {
  await problems_retrieve(req, res);
  res.render("favourites");
});

app.delete("/favourites", requireAuth, async (req, res) => {
  await problem_delete(req, res);
});

app.use(authRoutes);

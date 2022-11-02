const router = require("express").Router();
const User = require("../model/User");
const Vehicle = require("../model/Vehicle");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const cors = require("cors");

router.use(cors());

// REGISTER

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ username, email });
    if (oldUser) {
      return res.send({ error: "User Exists" });
    }

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ error: "Username Not Found" });
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }

  res.json({ status: "error", error: "Invalid Pasword" });
});

// GET ALL USERS
router.get("/vehiclelist", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Vehicle.find().sort({ _id: -1 })
      : await Vehicle.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordChecker =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!passwordChecker) {
    response.status(401).json({ message: "Invalid Credentials" });
  }
  const userForSingin = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForSingin, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  response.status(200).json({ token, user: userForSingin });
});

module.exports = loginRouter;

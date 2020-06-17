const router = require("express").Router();

const authRouter = require("../auth/auth-router");
const usersRouter = require("../router/users-router");

router.use("/auth", authRouter);

router.get("/", (req, res) => {
  res.json({ api: "Server Online" });
});

module.exports = router;

const router = require("express").Router();

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const postsRouter = require("../posts/posts-router");

const restrictedMiddleware = require("../middlewares/restricted-middleware")

router.use("/auth", authRouter);
router.use("/users", restrictedMiddleware, usersRouter);
router.use("/posts", restrictedMiddleware, postsRouter);

router.get("/", (req, res) => {
  res.json({ api: "Server Online" });
});

module.exports = router;

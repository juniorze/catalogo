const express = require("express");
const homeController = require("../controlles/homeController");
const usersController = require("../controlles/usersController");
const postController = require("../controlles/postController");
const imageMiddlewares = require("../middlewares/imageMiddlewares");

const router = express.Router();

router.get("/", homeController.index);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.loginAction);

router.get("/users/register", usersController.register);
router.post("/users/register", usersController.registerAction);

router.get("/search", postController.search);

router.get("/post/add", postController.add);
router.post(
  "/post/add",
  imageMiddlewares.upload,
  imageMiddlewares.resize,
  postController.addAction
);

router.get("/post/:slug/edit", postController.edit);
router.post(
  "/post/:slug/edit",
  imageMiddlewares.upload,
  imageMiddlewares.resize,
  postController.editAction
);

router.get("/post/:slug", postController.view);

module.exports = router;

// Rotas
// Paremetros de rotas:
// GET: req.query
// POST: res.body
// PARAMETROS DA URL: req.params.PARAMETRO (id,nome,slug, etc...)

// SENT
// JSON

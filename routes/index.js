const express = require('express');
const homeController = require('../controlles/homeController');
const usersController = require('../controlles/usersController');
const postController = require('../controlles/postController');
const imageMiddlewares = require('../middlewares/imageMiddlewares');
const authMiddlewares = require('../middlewares/authMiddlewares');

const router = express.Router();

router.get('/', homeController.index);
router.get('/users/login', usersController.login);
router.post('/users/login', usersController.loginAction);
router.get('/users/logout', usersController.logout);

router.get('/teste', homeController.teste);

router.get(
   '/users/register',
   authMiddlewares.isLogged,
   usersController.register
);
router.post(
   '/users/register',
   authMiddlewares.isLogged,
   usersController.registerAction
);

router.get('/users/forget', usersController.forget);
router.post('/users/forget', usersController.forgetAction);
router.get('/users/reset/:token', usersController.forgetToken);
router.post('/users/reset/:token', usersController.forgetTokenAction);

router.get('/profile', authMiddlewares.isLogged, usersController.profile);
router.post(
   '/profile',
   authMiddlewares.isLogged,
   usersController.profileAction
);

router.post(
   '/profile/password',
   authMiddlewares.isLogged,
   authMiddlewares.changePassword
);

router.get('/search', postController.search);

router.get('/post/add', authMiddlewares.isLogged, postController.add);
router.post(
   '/post/add',
   authMiddlewares.isLogged,
   imageMiddlewares.upload,
   imageMiddlewares.resize,
   postController.addAction
);

router.get('/post/:slug/edit', authMiddlewares.isLogged, postController.edit);
router.post(
   '/post/:slug/edit',
   authMiddlewares.isLogged,
   imageMiddlewares.upload,
   imageMiddlewares.resize,
   postController.editAction
);

router.get(
   '/post/:slug/delete',
   authMiddlewares.isLogged,
   postController.delete
);
router.post(
   '/post/:slug/delete',
   authMiddlewares.isLogged,
   postController.deleteAction
);

router.get('/post/:slug', postController.view);

module.exports = router;

// Rotas
// Paremetros de rotas:
// GET: req.query
// POST: res.body
// PARAMETROS DA URL: req.params.PARAMETRO (id,nome,slug, etc...)

// SENT
// JSON

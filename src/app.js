const express = require("express");
const mongoose = require("mongoose");
const mustache = require("mustache-express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const helpers = require("./helpers");
const errorHandlers = require("../handlers/erroHandler");
const router = require("../routes/index");

// Configurações
const app = express();

// Recebendo dados json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Utilizando mensagens flash
app.use(cookieParser(process.env.SECRET));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());

// Utilizando Passport
app.use(passport.initialize());
app.use(passport.session());

const User = require("../models/User");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Utilizando Helpers
app.use((req, res, next) => {
  res.locals.h = { ...helpers };
  res.locals.flashes = req.flash();
  res.locals.user = req.user;

  if (req.isAuthenticated()) {
    res.locals.h.menu = res.locals.h.menu.filter(i => i.logged);
  } else {
    res.locals.h.menu = res.locals.h.menu.filter(i => i.guest);
  }

  next();
});

// Utilizando rotas
app.use("/", router);

app.use(errorHandlers.notFound);

// Setando Views
let viewsPath = path.join(__dirname, "..", "views");

app.engine("mst", mustache(viewsPath + "/partials", ".mst"));
app.set("view engine", "mst");
app.set("views", viewsPath);

// Exportar o app
module.exports = app;

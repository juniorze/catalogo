const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login");
};

exports.loginAction = (req, res) => {
  const auth = User.authenticate();

  auth(req.body.email, req.body.password, (error, result) => {
    if (!result) {
      req.flash("error", "E-mail ou Senha invalido(a)!");
      res.redirect("/users/login");
      return;
    }

    req.login(result, () => {});

    req.flash("success", "Login realizado!");
    res.redirect("/");
  });
};

exports.register = (req, res) => {
  res.render("register");
};

exports.registerAction = (req, res) => {
  const newUser = new User(req.body);
  User.register(newUser, req.body.password, error => {
    if (error) {
      req.flash("error", "Ocorreu um erro ao cadastrar.");

      res.redirect("/users/register");
      return;
    }
    req.flash("success", "Cadastro realizado. Faça login");
    res.redirect("/users/login");
  });
};

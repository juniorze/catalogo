exports.defaultPageTitle = "Catálogo Abix";
exports.defaultUserLogin = "Visitante";

exports.menu = [
  { name: "Home", slug: "/", guest: true, logged: true },
  { name: "Adiciona Antena", slug: "/post/add", guest: false, logged: true },
  { name: "Adicionar Usuário", slug: "/users/register", guest: false, logged: true},
  { name: "Login", slug: "/users/login", guest: true, logged: false },
  { name: "Sair", slug: "/users/logout", guest: false, logged: true }
];

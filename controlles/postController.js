const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const slug = require("slug");

exports.view = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.render("postView", { post });
};

exports.search = async (req, res) => {
  let pesquisa = req.query.S;
  const post = await Post.find(
    {
      $or: [
        { size: { $regex: new RegExp(pesquisa, "i") } },
        { thickness: { $regex: new RegExp(pesquisa, "i") } },
        { compatible: { $regex: new RegExp(pesquisa, "i") } },
        { frequency: { $regex: new RegExp(pesquisa, "i") } },
        { type: { $regex: new RegExp(pesquisa, "i") } },
        { tags: { $regex: new RegExp(pesquisa, "i") } },
        { title: { $regex: new RegExp(pesquisa, "i") } }
      ]
    },
    function(err, result) {
      if (err) {
        req.flash("error", "Erro: " + error.message);
        return res.redirect("/");
      }
      if (result.length === 0) {
        req.flash("info", "Desculpe! Não localizei nenhum item...");
        res.redirect("/");
      }
    }
  );
  res.render("postSearch", { post });
};

exports.add = (req, res) => {
  res.render("postAdd");
};

exports.addAction = async (req, res) => {
  req.body.tags = req.body.tags.split(",").map(t => t.trim());
  const post = new Post(req.body);

  try {
    await post.save();
  } catch (error) {
    req.flash("error", "Erro: " + error.message);
    res.redirect("/post/add");
    return;
  }

  req.flash("success", "Salvo com sucesso!");

  res.redirect("/");
};

exports.edit = async (req, res) => {
  // 1. Pegar as informações do post.
  const post = await Post.findOne({ slug: req.params.slug });
  // 2. Carregar o formulário de edição.
  res.render("postEdit", { post });
};

exports.editAction = async (req, res) => {
  req.body.tags = req.body.tags.split(",").map(t => t.trim());
  req.body.slug = slug(req.body.title, { lower: true });

  try {
    // Procurar o item alterado.
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true, // Retornar o NOVO item atualizado.
        runValidators: true
      }
    );
  } catch (error) {
    req.flash("error", "Erro: " + error.message);
    return res.redirect("/post/" + req.params.slug + "/edit");
  }

  req.flash("success", "Atualizado com sucesso!");

  res.redirect("/");
};

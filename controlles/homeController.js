const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.index = async (req, res) => {
  let pageInfos = {
    pageTitle: "Home",
    posts: [],
    tags: [],
    tag: ""
  };

  pageInfos.tag = req.query.t;
  const postFilter =
    typeof pageInfos.tag != "undefined" ? { tags: pageInfos.tag } : {};

  const tagsPromise = await Post.getTagsList();
  const postsPromise = await Post.find(postFilter);

  const [tags, posts] = await Promise.all([tagsPromise, postsPromise]);

  for (let i in tags) {
    if (tags[i]._id == pageInfos.tag) {
      tags[i].class = "selected";
    }
  }

  pageInfos.tags = tags;
  pageInfos.posts = posts;

  console.log(pageInfos);

  res.render("home", pageInfos);
};

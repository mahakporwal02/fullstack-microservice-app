const Likes = require("../models/like");

const updateLikes = async (req, res) => {
  try {
    let { title } = req.body;
    title = title.trim()
    const { user_id } = req;
    let likesData = await Likes.findOne({ title });
    if (!likesData) {
      likesData = new Likes({
        title,
        likes: [user_id],
      });
      likesData.save();
      return res.status(200).json({
        title,
        likes: likesData.likes.length,
        is_liked: likesData.likes.includes(user_id),
      });
    }
    const likes = likesData.likes;
    if (likes.includes(user_id)) {
      likesData.likes = likes.filter(function (item) {
        return item !== user_id;
      });
    } else {
      likesData.likes.push(user_id);
    }
    await likesData.save();
    return res.status(200).json({
      title,
      likes: likesData.likes.length,
      is_liked: likesData.likes.includes(user_id),
    });
  } catch (err) {

    res.status(500).send("Internal Server Error");
  }
};

module.exports = updateLikes;

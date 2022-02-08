const Likes = require("../models/like");

const getLikes = async (req, res) => {
    try {
        const likesData = await Likes.find({});
        let likes = likesData.reduce((prev, cur) => {
            prev[cur.title] = cur.likes;
            return prev;
        }, {});
        res.status(200).json(likes);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = getLikes;
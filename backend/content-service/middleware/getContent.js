const Content = require('../models/content');
const sortByLikes = require('../utils/sortContent')

const getContent = async (req, res) => {
  try {
    const { likeData } = req;
    let content = await Content.find({});
    content = content.reduce((obj, item)=>{
      obj[item.title] = {
        'story': item.story, 
        'date_published': item.date_published,
        'created_by': item.user_id,
        'likes': 0
      }
      return obj;
    },{});
    likeData.forEach(element => {
      content[element.title].likes = element.likes;
    });
    content = sortByLikes(content)
    return res.status(200).json({content});
  } catch (err) {
    res.status(400).send('something went wrong');
  }
};

module.exports = getContent;
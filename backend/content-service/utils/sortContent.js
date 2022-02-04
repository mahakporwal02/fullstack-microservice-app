const sortByLikes = (obj) => {
  let order = Object.keys(obj);
  const res = {};
  order = order.sort((a, b)=> {
    return obj[b].likes - obj[a].likes;
  })
  order.forEach((key) => {
    res[key] = obj[key];
  });
  return res;
};

module.exports = sortByLikes;

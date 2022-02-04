const sortByLikes = (obj) => {
  let order = Object.keys(obj);
  const res = {};
  order = order.sort((a, b)=> {
    console.log(obj[b].likes)
    return obj[b].likes - obj[a].likes;
  })
  console.log(order)
  order.forEach((key) => {
    res[key] = obj[key];
  });console.log(order);
  return res;
};

module.exports = sortByLikes;

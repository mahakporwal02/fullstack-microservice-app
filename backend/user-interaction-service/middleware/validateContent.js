const axios = require('axios');

const validateContent = async (req, res, next) => {
  try {
    CONTENT_SERVICE_PORT = process.env.CONTENT_SERVICE_PORT;
    const { title } = req.body;
    const response = await axios.get(
      `http://localhost:${CONTENT_SERVICE_PORT}/content/validate?title=${title}`
    );
    if(response.status !== 200){
        return res.status(400).send('something went wrong');
    }
    next();
  } catch (err) {
    return res.status(err.response.status || 400).send(err.response.data || 'something went wrong');
  }
};

module.exports = validateContent;

const CSV = require('csv-string');

const readCSV = async (req, res, next) => {
  try {
    const buffer = { ...req.files }.file.data;
    const csvData = CSV.parse(buffer.toString('utf-8'));
    req.csvData = csvData.slice(1);
    next();
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = readCSV;

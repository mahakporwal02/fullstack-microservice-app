const Content = require('../models/content');

const validateTitle = async (req, res) => {
    try {
        let {title} = req.params;
        title = title.trim();
        if (!title) {
            return res.status(400).send('Title required');
        }
        const content = await Content.findOne({title});
        if (!content) {
            return res.status(404).send('Title not found');
        }
        return res.status(200).send('Title found');
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = validateTitle;
var Content = require('../models/content');

module.exports = {
  create
};

async function create(req, res) {
  // console.log('user: ', req.user)
  try {
    console.log('create content', req.body);
    const content = new Content({
      owner: req.user._id, 
      HTML: req.body.input,
      HTML_TOC: req.body.output, 
      keywords: req.body.keywords});
    await content.save();
    res.json('ok');
    // await Content.create(req.body);
  } catch (err) {
    res.json({err});
  }
}






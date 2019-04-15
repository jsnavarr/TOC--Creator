var Content = require('../models/content');

module.exports = {
  create,
  index
};

async function create(req, res) {
  // console.log('user: ', req.user)
  try {
    console.log('create content', req.body);
    const content = new Content({
      owner: req.user._id, 
      HTML: req.body.input,
      TOC: req.body.TOC,
      HTML_TOC: req.body.output, 
      keywords: req.body.keywords});
    await content.save();
    res.json('ok');
    // await Content.create(req.body);
  } catch (err) {
    res.json({err});
  }
}

async function index(req, res) {
  console.log('my content being called', req.body.user_id);
  const contents = await Content.find({})
    .sort({createdAt: 1})
    .limit(req.query.limit || 20);
  res.json(contents);
}




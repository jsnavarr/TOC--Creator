var Content = require('../models/content');

module.exports = {
  create,
  index,
  show,
  deleteContent,
  openContent,
};

async function create(req, res) {
  // console.log('user: ', req.user)
  try {
    // console.log('create content', req.body);
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
  // console.log('my content being called', req.body.user_id);
  const contents = await Content.find({})
    .sort({createdAt: 1})
    .limit(req.query.limit || 20);
  res.json(contents);
}

async function show(req, res) {
  // console.log('show being called', req.params.id);
  const contents = await Content.find({"owner": req.params.id})
    .sort({createdAt: 1})
    .limit(req.query.limit || 20);
  res.json(contents);
}


async function deleteContent(req, res) {
  // console.log('delete being called', req.params.id);
  const contents = await Content.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log('something went wrong trying to delete content');
    }
  });
  res.json(contents);
}

async function openContent(req, res) {
  // console.log('open being called', req.params);
  const content = await Content.find({_id: req.params.id});
  // console.log('content ', content);
  res.json(content);
}


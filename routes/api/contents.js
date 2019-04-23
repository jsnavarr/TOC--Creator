const express = require('express');
const router = express.Router();
const contentsCtrl = require('../../controllers/contents');

router.get('/', contentsCtrl.index);


/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require('../../config/auth'));
router.post('/', checkAuth, contentsCtrl.create);
router.delete('/:id', checkAuth, contentsCtrl.deleteContent);
router.get('/user/:id', checkAuth, contentsCtrl.show);
router.get('/:id', checkAuth, contentsCtrl.openContent);



/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;

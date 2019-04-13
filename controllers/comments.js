var Dish = require('../models/dish');

module.exports = {
    create, //save the data from the view to the database
}
function create(req, res) {
  Dish.findById(req.params.id, function(err, dish) {
      if (err) return res.render('dishes');
      dish.comments.push({text: req.body.text, rating: req.body.rating, timestamps: new Date() });
      console.log('text' + req.body.text);
      console.log('rating '+req.body.rating);
      // dish.comments.push({req.body);
      // console.log(dish.comments);
      dish.save(function(err){
        if(err){
          console.log('error trying to save comments');
        } else {
          res.redirect('/dishes/'+dish._id);
        }
      });
    });
  }

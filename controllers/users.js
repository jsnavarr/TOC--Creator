var User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login
    // new: newUser, //render the new user view
    // create, //save the data from the view to the database
    // edit: editUser,
    // update,
    // delete: deleteUser,
    // removeUser,
    // index, //only the admin can see all users
    // show //one specific user
}

async function signup(req, res) {
  console.log('signup was called');
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}


async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

// //only the admin can see all users
// function index(req, res, next) {
//     User.find({}).sort({name: 1}).exec(function(err, users){
//       console.log(req.user);
//       res.render('users/index', {
//         users
//       });
//     });
// }

// function deleteUser(req, res, next) {
//   User.findById(req.params.id, function(err, user) {
//     res.render('users/delete', { title: 'delete user', user});
//     });
// }

// function removeUser(req, res, next) {
//   console.log('trying to remove user');
//   User.findById(req.params.id, function(err, user) {
//     user.delete(function(err, user){
//       if(err){
//         console.log('error deleting user');
//       } else {
//         User.find({}).sort({name: 1}).exec(function(err, users){
//           console.log(users);
//           if(err){
//             console.log('error finding all users');
//             res.redirect('/users');
//           } else {    
//             res.redirect('/users');
//           }
//         });
//       }
//     });
//   });
// }

// function show(req, res, next) {
//   User.findById(req.params.id, function(err, user) {
//     if(err){
//       console.log('error trying to find user');
//     } else {
//       console.log('req.user.email ' +req.user.email + ' user.email '+user.email);
//       res.render('users/show', { title: 'user details', user, uemail: req.user.email});
//     } 
//   });
// }

// function update(req, res, next) {
//   // console.log('req.body.role '+req.body.role);
//   User.findById(req.params.id, function(err, user) {
//     if(err) {
//       console.log(err);
//       return res.redirect('/users');
//     }
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     console.log(req.body);
//     user.save(function(err) {
//     // one way to handle errors
//     if (err) return res.redirect('/users/'+user._id);
//     res.redirect('/users/'+user._id);
//     });
//   });
// }

// function editUser(req, res, next) {
//   console.log('trying to edit user');
//   User.findById(req.params.id, function(err, user) {
//     if (err) return res.redirect('/users');
//     res.render('users/edit', {title: 'edit user', user});
//   });
// }

// function create(req, res, next) {
//   var user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   });
//     console.log(user);
//     console.log(req.body);
//     user.save(function(err) {
//       // one way to handle errors
//       if (err) return res.redirect('/users');
//       // for now, redirect right back to new.ejs
//       res.redirect('/users/'+user._id);
//     });
//   }

// function newUser(req, res, next) {
//   //get the user login information (name, email) and update form with that information
//   var name = req.user.name;
//   var email = req.user.email;

//   res.render('users/new', {user: req.user, message, name, email});
// }

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
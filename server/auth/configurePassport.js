const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
// const userLevel = require('../models/userLevel');  
// const member = require('../models/member');
// const community = require('../models/community');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Passport is asking to authenticate user: ', username, ' with password ', password)
    User.findOne({ username: username }, function(err, user) {
      console.log('  Found user', user)
      if (err) { return done(err); }
      if (!user) {
        console.log('  No user exists')
        return done(null, false, { message: 'Incorrect username.' });
      }

      user.comparePassword(password, function(matchError, isMatch) {
        if (matchError) {
          console.log('  Error checking password')
          return done(null, false, { message: 'Error checking password.' });
        } else if (!isMatch) {
          console.log('  Password doesn\'t match')
          return done(null, false, { message: 'Incorrect password.' });
        } else {
          console.log('  Returning the user!')
          return done(null, user);
        }
      })
    });
  }
));

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log('Passport is asking to authenticate user: ', username, ' with password ', password)
//     User.findOne({ username: username }, function(err, user) {
//       console.log('  Found user', user)
//       if (err) { return done(err); }
//       if (!user) {
//         console.log('  No user exists')
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (user.password !== password) {
//         console.log('  Password doesn\'t match')
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       console.log('  Returning the user!')
//       return done(null, user);
//     });
//   }
// ));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function(_id, done) {
    User.findById(_id, async function(err, user) {
              
        if (user.username){
          done(err, {
            _id: _id,
            username: user.username,
            navbarAccess : user.navbarAccess,                 
            member: user.member                 
          }); 
        }    
    });
});

// passport.deserializeUser(function(_id, done) {
//   User.findById(_id, function(err, user) {
//       // console.log('31 deserialer user: ', user)
//       if (user.username){
//       done(err, {
//           _id: _id,
//           username: user.username,
//           userLevel: user.userLevel
        
//       });}
      
//   });
// });


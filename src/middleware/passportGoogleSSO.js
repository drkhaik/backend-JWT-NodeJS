const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.URL_BACKEND}/api/v1/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      if (profile._json.hd !== 'uef.edu.vn') {
        return done(null, false, 'Unauthorized domain');
      }
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: `${profile.name.familyName} ${profile.name.givenName}`,
            email: profile.emails[0].value,
            image: profile.photos[0].value
          });
          await user.save();
        }
        console.log("check user passport google SSO", user);
        return done(null, user);
      } catch (error) {
        return done(error, null)
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
});


// passport.serializeUser((user, cb) => {
//   cb(null, user._id);
// });

// passport.deserializeUser(async (_id, cb) => {
//   try {
//     const user = await User.findById(_id);
//     if (user) {
//       cb(null, user);
//     } else {
//       cb(new Error('User not found'), null);
//     }
//   } catch (err) {
//     console.log("Error deserializing", err);
//     cb(err, null);
//   }
// });
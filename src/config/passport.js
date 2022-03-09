const passport = require('passport');
const User = require('../models/User');
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
            function (accessToken, refreshToken, profile, done) {
            console.log('working');
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);
            // lookup user using User class
            // if not exist, save it using User and call done(null, createdUser)
            // if it does exist call done(null, user)
            User.find(profile.id)
                .then((user) => {
                    done(null, user);
                })
                .catch( async (err) => {
                    //const id = profile.id;
                    //const email = profile.emails[0].value;
                    //const imageUrl = profile.photos[0].value;
                    const user = await User.create({ 
                        id: profile.id, 
                        email: profile.emails[0].value, 
                        imageUrl: profile.photos[0].value,
                        name: profile.displayName
                    });
                    done(null, user);
                });
        }
    )
);

passport.serializeUser(function (user, done) {
    //console.log('serializing', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    //console.log('deserializing', id);
    User.find(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

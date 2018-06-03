var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
const db = require('../models');
var bcrypt = require('bcrypt');


var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    // 사용자가 인증을 성공할 경우
    passport.serializeUser(function(user, done) {

        done(null, user.id);
    });

    // used to deserialize the user
    // 이후 사용자의 요청 시마다 호출
    passport.deserializeUser(function(user, done) {

        done(null, user)
    });

    // =========================================================================
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({

            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

        },
        function(req, token, refreshToken, profile, done) {

            var profile_json = profile._json;

            db['GoogleUser'].findOne({
                where: {
                    id: profile._json.id
                }
            }).then(function(user) {

                if (user != null) {
                    return done(null, user);
                } else {
                    var user_id = profile._json.id;

                    db['GoogleUser'].create({
                        id: user_id,
                        name: profile_json.displayName,
                        token: token,
                        email: profile_json.emails[0].value, // pull the first email
                        password: user_id+"_pw",
                        createdAt: Date.now(),
                        updatedAt: Date.now()

                    }).then(function (newUser) {

                        if (newUser == null) {
                            throw errors
                        }
                        return done(null, newUser)
                    });

                }
            }).catch(function(e) {
                console.log(e);
            });

        }));
};
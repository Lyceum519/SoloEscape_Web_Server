const multer  = require('multer')
const db = require('../models');
const upload = multer({dest: 'uploads/' });


module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        // res.render('index.ejs');
        res.send("routing to main page");
    });

    // PROFILE SECTION =========================
    // app.get('/profile', isLoggedIn, function(req, res) {
    //     // res.render('profile.ejs', {
    //     //     user : req.user
    //     // });
    //     res.send("routing to profile page and send user info");
    // });


    // GET GOOGLE USER DATA ====================
    app.get('/googleuser', function(req, res) {
        db['GoogleUser'].findAll()
        .then(function(users) {
          res.json(users)
          // [{name: 'Hoony', age: 27}, {name: 'Ice', age: 22}]
        }).catch(function(e) {
            console.log(e);
        });
    });

    // GET PROFILE DATA =========================
    app.get('/profile', function(req, res) {
        console.log(4444, "get profile")
        db['Profile'].findAll()
        .then(function(profiles) {
            res.json(profiles)
        }).catch(function(e) {
            console.log(e);
        });
    });

    // SAVE PROFILE DATE ========================
    app.post('/profile-save', function(req, res) {
        console.log(1111, req.body)
        db['Profile'].save({
            id: req.body.id,
            nickname: req.body.nickname,
            picture: new Blob(),
            tag: req.body.tag,
        })
        .then((profiles) => {
            console.log("save profile success", profiles)
        }).catch((e) => {
            console.log("save profile error", e);
        })
z    });

    // GET PROFILE DATA BY ID ===================
    app.get('/profile/:id', function(req, res) {
        console.log(33333, "get profile")
        console.log(req.params.id)
        db['Profile'].findAll({
            where: {
                id: req.params.id,
            }
        })
        .then(function(profiles) {
            res.json(profiles)
        }).catch(function(e) {
            console.log(e);
        })
    });

    // GET LOCAL USER DATA ====================
    app.get('/localuser', function(req, res) {
        db['LocalUser'].findAll()
        .then(function(users) {
          res.json(users)
          // [{name: 'Hoony', age: 27}, {name: 'Ice', age: 22}]
        }).catch(function(e){
            console.log(e);
        });
    });

    // GET TAG DATA ====================
    app.get('/tag', function(req, res) {
        db['Tag'].findAll()
        .then(function(tags) {
          res.json(tags)
          // [{name: 'Hoony', age: 27}, {name: 'Ice', age: 22}]
        }).catch(function(e) {
            console.log(e);
        });
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // google ---------------------------------
    // send to google to do the authentication
    app.get('/auth/google',
        passport.authenticate('google', { scope : ['openid', 'email'] })
    );

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect : '/'}),
        function (req, res) {
            res.json(req.user.dataValues)

        }
    );


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future


    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
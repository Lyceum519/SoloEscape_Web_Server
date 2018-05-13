const db = require('../models');

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

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        // req.logout();
        // res.redirect('/');
        res.send("do logout and routing to main page");
    });

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

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
        res.send(" first login (locally) - routing to login form");
        // res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {
        // res.render('signup.ejs', { message: req.flash('loginMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google',
        passport.authenticate('google', { scope : ['openid', 'email'], accessType: 'offline' }),
        function (req, res) {

        });

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/',
            failureRedirect : '/'
        }),
        function (req, res) {
            res.send(req.user.displayName);
        }

    );


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

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

    // local -----------------------------------
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', function(req, res) {
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
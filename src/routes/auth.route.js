const router = require('express').Router();
const passport = require('passport');
// path: auth/

// GET /login
router.get('/login', function (req, res) {
    res.sendFile('src/public/html/login.html', { root: "./" });
    //res.redirect('./public/html/login.html');
});

// GET /google/login
router.get('/google/login', passport.authenticate('google', { scope:
    ['profile', 'email'] }));

// GET /google/callback
router.get(
    '/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        // print req.query.code
        console.log(req.query.code);
        // Successful authentication, redirect to “/”
        res.redirect('/auth/profile');
} );

// GET /verifyLogin
router.get('/verifyLogin', function (req, res) { 
    if (req.user === undefined) res.status(401).send('Not Authorized');
    else res.status(200).send('Logged In');
});

// GET /logout
router.get('/logout', function (req, res) {
    req.logout();
    req.session = null;
    res.redirect('/');
});

router.get('/profile', function (req, res) {
    res.sendFile('src/public/html/profile.html', { root: "./" });
});

router.get('/authUser', function (req, res) {
    if (req.user) {
        const user = {user: req.user};
        res.send(user);
    }
    else res.status(401).send('Not Authenticated');
});


module.exports = router;

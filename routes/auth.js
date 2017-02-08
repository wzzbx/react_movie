const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
router.get('/google', passport.authenticate('google', {scope: ['email profile']}));

router.get('/google/callback', (req, res, next) => {

   passport.authenticate('google', (err, token, profile) => {
     
    if (err) {
      return res
        .status(400)
        .json({success: false, message: 'Could not login.'}); 
    }

       res.redirect('https://evening-river-26102.herokuapp.com/?token=#'+token+'?user='+profile.emails[0].value);
  
		
   
  })(req, res, next);
});

module.exports = router;
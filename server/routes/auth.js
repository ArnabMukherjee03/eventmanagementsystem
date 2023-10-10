const express = require('express');
const passport = require('passport');
const { signUp, login, checkAuth, logout, resetPasswordReq, resetPasswordRes, verify } = require('../controllers/auth');

// $ Initialize router
const router = express.Router(); 

// $ Authentication Routes
router.post('/signup',signUp)
      .post('/login',login)
      .get('/check',passport.authenticate('jwt'),checkAuth)
      .get('/logout',logout)

exports.router = router;


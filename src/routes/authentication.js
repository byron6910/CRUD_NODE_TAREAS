const express = require('express');
const router =express.Router();
const passport=require('passport');
const {isLoggedIn,isNotLoggedIn}=require('../lib/auth');

router.get('/singup',isNotLoggedIn,(req,res)=>{
  res.render('auth/singup');
});


router.post('/singup',isNotLoggedIn,
  passport.authenticate('local.singup',{
    successRedirect:'/profile',
    failureRedirect:'/singup',
    failureFlash:true
  }));

router.get('/singin',isNotLoggedIn,(req,res)=>{
  res.render('auth/singin');
});
//
// router.post('/singin',isNotLoggedIn,
//   passport.authenticate('local.singin',{
//     successRedirect:'/profile',
//     failureRedirect:'/singin',
//     failureFlash:true
//   }));

  router.post('/singin',(req,res,next)=>{
      passport.authenticate('local.singin',{
        successRedirect:'/profile',
        failureRedirect:'/singin',
        failureFlash:true
      })(req,res,next)


    });

//   router.post('/singin', (req, res, next) => {
//   req.check('username', 'Username is Required').notEmpty();
//   req.check('password', 'Password is Required').notEmpty();
//   const errors = req.validationErrors();
//   if (errors.length > 0) {
//     req.flash('message', errors[0].msg);
//     res.redirect('/singin');
//   }
//   passport.authenticate('local.singin', {
//     successRedirect: '/profile',
//     failureRedirect: '/singin',
//     failureFlash: true
//   })(req, res, next);
// });

router.get('/profile',isLoggedIn,(req,res)=>{
  //res.send('This is your profile');
  res.render('profiles');
});

router.get('/logout',isLoggedIn,(req,res)=>{
  req.logOut();
  res.redirect('singin');
});

module.exports=router;

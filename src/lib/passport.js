const passport = require('passport');
const LocalStrategy=require('passport-local').Strategy;
const pool=require('../database.js');
const helpers=require('./helpers.js');

passport.use('local.singin',new LocalStrategy({
  usernameField:'username',
  passwordField:'password',
  passReqToCallback:true
},async(req,username,password,done)=>{
  console.log(req.body);
  console.log(username);
  console.log(password);
  const rows= await pool.query('SELECT * FROM users WHERE username=?',[username]);
  console.log(rows);
  if(rows.length>0){
    const user=rows[0];
    const validPassword=await helpers.matchPassword(password,user.password)
      if(validPassword){
        done(null,user,req.flash('success','Bienvenido'+user.username));
      } else{
        done(null,false,req.flash('message','Incorrect Password'));
      }
    }
      else {
        return done(null,false,req.flash('message','Nombre de usuario no existe'));
      }
}));

passport.use('local.singup',new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback:true
},async (req,username,password,done)=>{
  const {fullname}=req.body;
  const newUser=
  {
    username,
    password,
    fullname
  };

  newUser.password=await helpers.encryptPassword(password);
  const result=await pool.query('INSERT INTO users SET ?',[newUser]);

  console.log(result);
  newUser.id=result.insertId;
  return done(null,newUser);
}));

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
  const rows=await pool.query('SELECT * FROM users WHERE id=?',[id]);
  done(null,rows[0]);
});

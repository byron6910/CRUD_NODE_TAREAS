const express = require('express');
const router =express.Router();
const pool = require('../database');
const {isLoggedIn,isNotLoggedIn}=require('../lib/auth');

router.get('/add',isLoggedIn,(req,res)=>{
  res.render('links/add');
  //res.send('Form');
});

router.post('/add',isLoggedIn,async (req,res)=>{
  console.log(req.body);
  const {title,url,description}=req.body;
  const newLink={
    title,
    url,
    description,
    user_id:req.user.id
  };
  await pool.query('INSERT INTO links set ?',[newLink]);
  req.flash('success','links agregado exitosamente');
  res.redirect('/links');
});

router.get('/',async(req,res)=>{

  const links = await pool.query('SELECT * FROM links WHERE user_id=?',[req.user.id]);
  console.log(links);
  res.render('links/list',{links});
});

router.get('/delete/:id',isLoggedIn,async (req,res)=>{
   const {id}=req.params;
   await pool.query('DELETE FROM links WHERE ID=?', [id]);
   req.flash('success','Enlace removido de BD');
   res.redirect('/links');
});

router.get('/edit/:id',isLoggedIn,async(req,res)=>{

  const {id}=req.params;
  const links=await pool.query('SELECT * FROM links WHERE id=?',[id]);
  console.log(links[0]);
  res.render('links/edit',{link:links[0]});
});

router.post('/edit/:id',isLoggedIn, async (req,res)=>{
  const {id}=req.params;
  const {title,description,url}=req.body;
  const newLink={
    title, description, url
  };

  await pool.query('UPDATE links set ? WHERE id=?',[newLink,id])
  req.flash('success','Enlace editado de BD');
  console.log(res);
  res.redirect('/links');

});
module.exports=router;

const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encryptPassword= async(password)=>{

  const salt= await bcrypt.genSalt(10);//genera un hash patron
  const hash= await bcrypt.hash(password,salt);//genera cifrado
  return hash;
};

helpers.matchPassword=async(password,savedPassword)=>{
  try {
      return await bcrypt.compare(password,savedPassword);
  } catch (e) {
    console.log(e);
  }

};//para comparar en el logeo

module.exports=helpers;

const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {userModel} = require("./config");
//const { MongoClient } = require('mongodb');

/* const nameDatabase = 'database';
const nameCollection = 'usuarios';
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri); */

const users = [];

passport.use('registracion', new LocalStrategy((username, password, callback) => {
  async function saveUser() {

    const name = await userModel.find({ name: username });
    console.log(name[0]);
    //const user = await client.db(nameDatabase).collection(nameCollection).findOne({ username: username });

    if (name[0]) return callback(new Error('Ya existe un usuario con ese nombre'));

    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    //const usuarioCreado = { username, password: passwordHasheado };

    const usuarioCreado = {
      name: username,
      password: passwordHasheado
    }

    await userModel(usuarioCreado).save();
    //await client.db(nameDatabase).collection(nameCollection).insertOne(usuarioCreado);
    callback(null, usuarioCreado);
  }
  saveUser();
}));

passport.use('autenticacion', new LocalStrategy((username, password, callback) => {
  async function findUser() {
    const user = await userModel.find({ name: username });
    
    //const user = await client.db(nameDatabase).collection(nameCollection).findOne({ username: username });
    if (!user[0] || !bcrypt.compareSync(password, user[0].password)) return callback(new Error('Usuario no existente o password incorrecto'));
    
    const usuario = {name: user[0].name, password: user[0].password};
    callback(null, usuario);

  }
  findUser();
  
}));

passport.serializeUser((usuario, callback) => {
  callback(null, usuario.name);
});

passport.deserializeUser((username, callback) => {
  async function findUser() {
    const user = await userModel.find({ name: username });
    //const user = await client.db(nameDatabase).collection(nameCollection).findOne({ user: username });
    const usuario = {name: user.name, password: user.password};

    callback(null, usuario);
  }
  findUser();
});

module.exports = passport;
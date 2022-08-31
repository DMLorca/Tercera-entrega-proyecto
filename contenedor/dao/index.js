

  const {Carritos} = require('./carrito/carritoDaoMongoDb');
  const {Producto} = require('./producto/productoDaoMongoDb');
  module.exports = {Producto, Carritos};

if(process.env.VAR_ENT == "firebase"){
  const {Carritos} = require('./carrito/carritoDaoFirebase');
  const {Producto} = require('./producto/productoDaoFirebase');
  module.exports = {Producto, Carritos};
}



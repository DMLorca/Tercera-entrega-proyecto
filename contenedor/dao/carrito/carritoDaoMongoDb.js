const {ContenedorMongoDb} = require('../../ContenedorMongoDb.js');
const {carro} = require('../../../config');


class CarritosDaoMongoDb extends ContenedorMongoDb {

  constructor(carro) {
    super(carro);
  }

  async addChart(user) {
    try {
      for (; ;) {
        const resFind = await this.modelMongo.find({ idc: this.idc });
        console.log(resFind);

        if (resFind[0]) { //Si existe el idc, incrementa en 1 y comprueba otra vez
          this.idc++;
        } else {          //Si no existe el indice, entonces lo guarda y devuelve el guardado
          const chart = { idc: this.idc, user: user};
          const resSave = await this.modelMongo(chart).save();
          return resSave.user;
        }
      }
    } catch (error) {
      console.log("Error en addChart(): " + error);
    }
  }

  async addChartUser(user) {
    try {

        const resFind = await this.modelMongo.find({ user: user });
        console.log(user);
        console.log(resFind);
        if (resFind[0]) { //Si existe el idc, incrementa en 1 y comprueba otra vez
          return null;
        } else {          //Si no existe el indice, entonces lo guarda y devuelve el guardado
          const resSave = await this.modelMongo({ user: user }).save();
          return resSave.user;
        }
    } catch (error) {
      console.log("Error en addChartUser(): " + error);
    }
  }

  async addProdChart(objProd, carroName) {
    try {
      const resFind = await this.modelMongo.find({ user: carroName });
      console.log(resFind);

      if (resFind[0]) {
        objProd[0].user = carroName;
        const resSave = await this.modelMongo(objProd[0]).save();
        return resSave;
      } else {
        return null;
      }

    } catch (error) {
      console.log("Error en addProdChart: " + error);
    }

  }

  async getByIdChart(carroId) {
    try {
      const resFind = await this.modelMongo.find({ idc: carroId });
      return resFind;
    } catch (error) {
      console.log("Error en getByIdChart: " + error);
    }
  }

  async deleteByIdChart(carroName, prodId) {
    try {
      const resFind = await this.modelMongo.find({ $and: [{ id: prodId }, { user: carroName }] });

      if (resFind[0]) {
        const res = await this.modelMongo.deleteMany({ id: prodId });
        return res.deletedCount //Si 0 (no eliminado), si !=0 (eliminado)
      } else {
        return null;
      }

    } catch (error) {
      console.log("Error en deleteByIdChart: " + error);
    }
  }

  async deleteChart(carroName) {
    try {
      const res = await this.modelMongo.deleteMany({ user: carroName });
      return res.deletedCount //Si 0 (no eliminado), si !=0 (eliminado)
    } catch (error) {
      console.log("Error en deleteChart(): " + error);
    }

  }
  
}

const CarritosMongo = new CarritosDaoMongoDb(carro);
module.exports.Carritos = CarritosMongo;
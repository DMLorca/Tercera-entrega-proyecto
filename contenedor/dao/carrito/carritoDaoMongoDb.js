const {ContenedorMongoDb} = require('../../ContenedorMongoDb.js');
const {carro} = require('../../../config');


class CarritosDaoMongoDb extends ContenedorMongoDb {

  constructor(carro) {
    super(carro);
  }

  async addChart() {
    try {
      for (; ;) {
        const resFind = await this.modelMongo.find({ idc: this.idc });
        if (resFind[0]) { //Si existe el idc, incrementa en 1 y comprueba otra vez
          this.idc++;
        } else {          //Si no existe el indice, entonces lo guarda y devuelve el guardado
          const resSave = await this.modelMongo({ idc: this.idc }).save();
          return resSave.idc;
        }
      }
    } catch (error) {
      console.log("Error en addChart(): " + error);
    }
  }

  async addProdChart(objProd, carroId) {
    try {
      const resFind = await this.modelMongo.find({ idc: carroId });

      if (resFind[0]) {
        objProd.idc = carroId;
        const resSave = await this.modelMongo(objProd).save();
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

  async deleteByIdChart(carroId, prodId) {
    try {
      const resFind = await this.modelMongo.find({ $and: [{ id: prodId }, { idc: carroId }] });

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

  async deleteChart(carroId) {
    try {
      const res = await this.modelMongo.deleteMany({ idc: carroId });
      return res.deletedCount //Si 0 (no eliminado), si !=0 (eliminado)
    } catch (error) {
      console.log("Error en deleteChart(): " + error);
    }

  }
  
}

const CarritosMongo = new CarritosDaoMongoDb(carro);
module.exports.Carritos = CarritosMongo;
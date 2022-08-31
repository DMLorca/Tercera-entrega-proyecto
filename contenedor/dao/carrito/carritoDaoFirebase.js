const {ContenedorFirebase} = require('../../ContenedorFirebase');
const {queryChart} = require('../../../config');


class CarritosDaoFirebase extends ContenedorFirebase {

  constructor(query) {
    super(query);
  }
  async getByIdChart(numberId) {
    try {
      let find = {};
      const resultados = (await this.query.get()).docs;
      resultados.map(resultado => {
        if (resultado.data().idc == numberId)
          find = resultado.data();
      });
      return find;
    } catch (error) {
      console.log("Error en getByIdChart(): " + error);
    }
  }

  //Busca el id del documento que tiene el producto y esta en tal carro
  async getIdDoc(prodId, carroId) {
    try {
      let find = { id: "" };
      const resultados = (await this.query.get()).docs;
      resultados.map(resultado => {
        if ((resultado.data().id == prodId) && (resultado.data().idc == carroId))
          find.id = resultado.id;
      });
      return find;
    } catch (error) {
      console.log("Error en getIdDoc(): " + error);
    }
  }

  async getIdDocChart(carroId) {
    try {
      let find = { id: "" };
      const resultados = (await this.query.get()).docs;
      resultados.map(resultado => {
        if (resultado.data().idc == carroId)
          find.id = resultado.id;
      });
      return find;
    } catch (error) {
      console.log("Error en getIdDocChart(): " + error);
    }
  }

  async addChart() {
    try {

      for (; ;) {

        let save = await this.getByIdChart(this.idc);

        if (save.idc) { //Si existe el idc, incrementa en 1 y comprueba otra vez
          this.idc++;
        } else {          //Si no existe el indice, entonces lo guarda y devuelve el guardado
          const newChart = this.query.doc();
          await newChart.create({ idc: this.idc });
          return this.idc;
        }
      }
    } catch (error) {
      console.log("Error en addChart(): " + error);
    }
  }

  async addProdChart(objProd, carroId) {
    try {
      const resFind = await this.getByIdChart(carroId);

      if (resFind.idc) {
        objProd.idc = carroId;
        const saveProd = this.query.doc();
        const res = await saveProd.create(objProd);
        return res;
      } else {
        return null;
      }

    } catch (error) {
      console.log("Error en addProdChart: " + error);
    }

  }

  async deleteByIdChart(carroId, prodId) {
    try {
      const resFind = await this.getByIdChart(carroId);

      if (resFind.idc) {
        const res = await this.getIdDoc(prodId, resFind.idc);  //obtengo id del documento que tiene el producto

        if (res.id) {
          const doc = this.query.doc(res.id);
          const item = await doc.delete();
          return item.writeTime; //si !=0 (eliminado)
        } else {
          return null;
        }

      } else {
        return null;
      }

    } catch (error) {
      console.log("Error en deleteByIdChart: " + error);
    }
  }

  async deleteChart(carroId) {
    try {

      let flag = true, res, item;
      do {
        res = await this.getIdDocChart(carroId);

        if (res.id) {
          const doc = this.query.doc(res.id);
          item = await doc.delete();
        } else {
          flag = false;
        }
      } while (flag);
      return item;
    } catch (error) {
      console.log("Error en deleteChart(): " + error);
    }

  }

}

const CarritosFire = new CarritosDaoFirebase(queryChart);
module.exports.Carritos = CarritosFire;

const {ContenedorFirebase} = require('../../ContenedorFirebase');
const {queryProd} = require('../../../config');

class ProductosDaoFirebase extends ContenedorFirebase {

  constructor(query) {
    super(query);

  }

  async getByIdProd(numberId) {
    try {
      let find = { id: "" };
      const resultados = (await this.query.get()).docs;
      resultados.map(resultado => {
        if (resultado.data().id == numberId)
          find.id = resultado.id;
      });
      return find;
    } catch (error) {
      console.log("Error en getByIdChart(): " + error);
    }
  }

  async getById(numberId) {
    try {
      let find = {};
      const resultados = (await this.query.get()).docs;
      resultados.map(resultado => {
        if (resultado.data().id == numberId)
          find = resultado.data();
      });
      return find;
    } catch (error) {
      console.log("Error en getByIdChart(): " + error);
    }
  }

  async addProd(objProd) {
    try {

      for (; ;) {

        let save = await this.getByIdProd(this.idc);

        if (save.id) { //Si existe el idc, incrementa en 1 y comprueba otra vez
          this.idc++;
        } else {          //Si no existe el indice, entonces lo guarda y devuelve el guardado
          objProd.id = this.idc;
          const newProd = this.query.doc();
          const res = await newProd.create(objProd);
          return res;
        }
      }
    } catch (error) {
      console.log("Error en addChart(): " + error);
    }
  }

  async deleteByIdProd(prodId) {
    try {
      const resFind = await this.getByIdProd(prodId);

      if (resFind.id) {
        const doc = this.query.doc(resFind.id);
        const item = await doc.delete();
        return item.writeTime;

      } else {
        return null;
      }
    } catch (error) {
      console.log("Error en deleteById: " + error);
    }
  }

  async updateByIdProd(prodId, tit, des, cod, timsta, sto, pri, thumb) {
    try {
      const resFind = await this.getByIdProd(prodId);
      let cont = 0;
      console.log(resFind)
      if (resFind.id) {
        const doc = this.query.doc(resFind.id);
        if (tit) {
          await doc.update({ title: tit });
          cont++;
        }
        if (des) {
          await doc.update({ description: des });
          cont++;
        }
        if (cod) {
          await doc.update({ code: cod });
          cont++;
        }
        if (timsta) {
          await doc.update({ timestamp: timsta });
          cont++;
        }
        if (sto) {
          await doc.update({ stock: sto });
          cont++;
        }
        if (pri) {
          await doc.update({ price: pri });
          cont++;
        }
        if (thumb) {
          await doc.update({ thumbnail: thumb });
          cont++;
        }
        return cont;
      } else {
        return null;
      }
    } catch (error) {
      console.log(`Problema en updateProd(): ${error}`);
    }
  }
}

const instProdFire = new ProductosDaoFirebase(queryProd);

module.exports.Producto = instProdFire;
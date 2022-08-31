const {ContenedorMongoDb} = require('../../ContenedorMongoDb.js');
const {producto} = require('../../../config');

class ProductoDaoMongoDb extends ContenedorMongoDb {

    constructor(prod) {
        super(prod);
    }

    async addProd(objProd) {
        try {
            for (; ;) {
                const resFind = await this.modelMongo.find({ id: this.idc });
                if (resFind[0]) { //Si existe el idc, incrementa en 1 y comprueba otra vez
                    this.idc++;
                } else {          //Si no existe el indice, entonces lo guarda y devuelve el guardado
                    objProd.id = this.idc;
                    const resSave = await this.modelMongo(objProd).save();
                    return resSave;
                }
            }
        } catch (error) {
            console.log("Error en addCarro(): " + error);
        }
    }

    async getByIdProd(prodId) {
        try {
            const resFind = await this.modelMongo.find({ id: prodId });
            if (resFind[0])
                return resFind;
            else
                return null;
        } catch (error) {
            console.log("Error en getAll: " + error);
        }
    }

    async deleteByIdProd(prodId) {
        try {
            const resFind = await this.modelMongo.find({ id: prodId });

            if (resFind[0]) {
                const res = await this.modelMongo.deleteMany({ id: prodId });
                return res.deletedCount; //Si 0 (no eliminado), si !=0 (eliminado)
            } else {
                return null;
            }
        } catch (error) {
            console.log("Error en deleteById: " + error);
        }
    }

    async updateByIdProd(prodId, tit, des, cod, timsta, sto, pri, thumb) {
        try {
            const resFind = await this.modelMongo.find({ id: prodId });
            let cont = 0;
            if (resFind[0]) {
                if (tit) {
                    await this.modelMongo.updateOne({ id: prodId }, { $set: { title: tit } });
                    cont++;
                }
                if (des) {
                    await this.modelMongo.updateOne({ id: prodId }, { $set: { description: des } });
                    cont++;

                }
                if (cod) {
                    await this.modelMongo.updateOne({ id: prodId }, { $set: { code: cod } });
                    cont++;

                }
                if (timsta) {
                    await this.modelMongo.updateOne({ id: prodId }, { $set: { timestamp: timsta } });
                    cont++;

                }
                if (sto) {
                    await this.modelMongo.updateOne({ id: prodId }, { $set: { stock: sto } });

                }
                if (pri) {
                    await this.modelMongo.updateOne({ id: prodId }, { $set: { price: pri } });
                    cont++;

                }
                if (thumb) {
                    await this.modelMongo.updateOne({ id: prodId }, { $set: { thumbnail: thumb } });
                    cont++;

                }
                return cont;
            } else {
                return null;
            }
        } catch (error) {
            console.log(`Problema en getById(): ${error}`);

        }
    }
    
}

const instProdMongo = new ProductoDaoMongoDb(producto);

module.exports.Producto = instProdMongo;
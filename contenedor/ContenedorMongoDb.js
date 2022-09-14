

class ContenedorMongoDb {

  constructor(modelMongo) {
    this.modelMongo = modelMongo;
    this.idc = 1;
  }

  async getAll(user) {
    try {
      const resFind = await this.modelMongo.find({user: user}).lean();
      return resFind;
    } catch (error) {
      console.log("Error en getAll: " + error);
    }
  }

  async deleteAll() {
    try {
      const res = await this.modelMongo.deleteMany();
      return res.deletedCount //Si 0 (no eliminado), si !=0 (eliminado)
    } catch (error) {
      console.log("Error en deleteCarro(): " + error);
    }
  }

}

module.exports.ContenedorMongoDb = ContenedorMongoDb;

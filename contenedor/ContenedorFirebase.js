
class ContenedorFirebase{

  constructor(query){
    this.query = query;
    this.idc = 1;
  }

  async getAll(){
    try {
      const resultados = (await  this.query.get()).docs;
      return(resultados.map(resultado => resultado.data()));
      
    } catch (error) {
      console.log("Error en getAll: ", error)
    }
  }

}

module.exports.ContenedorFirebase = ContenedorFirebase;
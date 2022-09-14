/* 
CONFIGURACION FIREBASE
*/

const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "basefirebase-73c4d",
  "private_key_id": "a9bcb1a03526841bb9f89895b93b011ed3f32049",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDcBkW7CjoM4tgN\n1K8824tQ0YyWnjbxUeKMet9LssFLACir9ATabW+au5mx7w8QMcsMk4rgG4h04sM0\nE47JaKxG4TksEf8z8YFhcim4ZYBjCGK5nDe3u9rznL7Q35UqzHV9haXlsfdYn3LY\nQe4rYXp4yVM+iB4OTVdJDxAJ2wNnSZYT6QAnQLfCYDB72gwYU8xtXOcN9ZbtVp+z\nGx3rTwbKHbC3Zf8zbq4Uy1E3xbhmBr+HZH9prrqV+ZiZuN4IZTKx/nh4+924lBmk\nYZYndzIfT3WFyBTuM2B+kwSlGBvqotDCtGYiTj5xW7nvLjZ6yABO2NZScDDGqB5n\noCqg03IlAgMBAAECggEAYNd76prSOSjBGrlRlhI1rBFHdWXW3fmCIv3T+aAIlsfP\nnvutBSzk0fCfceM8OI8KBZONLR3BPl0uuOWg08J4DUyFWwHi10yFe0wB0/ENBMnE\nlliNZ5fOA6qqjAnUwH00e1aPUd22djHcHRZLy5lAjBhkxOGphPcCo5v3HbdhtJws\nVs82eGdvLozZ2Kb9HAeL842LeElLWi+7dTHQIbbGGUZHt3okEMvdRqdu+gPsaX9W\nPu055BYIYw19lXsVAHkwSdwcnBZv233lKvkXQdPRGSu9NKnitgVdLdV9moHwxFjD\n0LODKnXF8OoNwFJc/cxAg0yC65GZX/lMOvcyLlR6wwKBgQD2zh+U9tahEgXquGLS\n5mKveNtxCBcmt+wJn3OhJhcj1gNL+d/rBhp9jfcVqsnCBKlwE0u6kktmxKzGsRJs\nBHwwiSR5TpLnloAJpAIqlKLZdJ8ELu7Gwgrvl4tbST2AavaRAyZvyMnMhYHbhCY1\nW8nZZDd9LgT/AmG0aLCLRIaP3wKBgQDkOLs9Fmu3ZkmBHl42MxyoZow8I1pyE7V3\ndqxVqJolc9XxFc/r+Xb6eD3Hv1mY7JrB/qEWp+9MMXyq52yJeboP/99rZ/4HVnJc\nak0FQ8oMOAAxgfQJnpFSi1Hp594uejAZ+0eM30MdESgXJtui2c1Zzff6cTi+5y/v\nxxdxVvXuewKBgQDc5ky6JdygueL13ScGoRI/ACtZFeayzvfC/SafW9pmRs0YmYPj\ndckMC57Vk9GViFqnZ33mdb5rMyl5hU95wuHtBzLQKJWwFrJu7o7J0dOYUptpQSCS\nYWcsXzVp9TnI0PPzgyBJ+Ss1lWFPOw5/v7IAk4Re1GvAWz9cHD+3xxOxfQKBgCuG\nklc1Nnf03yHr+8XUe6u2WxqBF5fYIGzXSkjP7g4kiHIBWfVET6e3VPkKinj67wz+\nlhRvFNlwOrmRh4a0m4K/pwmh/LXDi+4KLARMCHXKHGdUxIktH8QhZA77NMmibhgW\nb2/ziKY7hmzb8VmetmZhPOEbxNnL172gN91a226PAoGBAIVjBRFfej/jFaM3IafX\n7xw4E24AiN/DY9A3njnaaoJwlGfOoyu2SGP0W2jyfvRr2d06RgekdMwMItS96af5\n5QuJvahGs2zLc6jEODG6wQ5huJh9DC25EDfGWLNYA9tKKwYp0Vru5wM5ciYVNAcR\nNX4mR0xMY9XsbXoFaeNPB4lt\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-438d7@basefirebase-73c4d.iam.gserviceaccount.com",
  "client_id": "105203043895764042548",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-438d7%40basefirebase-73c4d.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://basefirebase-73c4d.firebaseio.com"
});

const dbChart = admin.firestore();
const queryChart = dbChart.collection("carrito");

const dbProd = admin.firestore();
const queryProd = dbProd.collection("producto");

/* 
CONFIGURACION MONGODB
*/

const mongoose = require("mongoose");

//mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority

mongoose.connect(
  "mongodb+srv://diego:Mongo2022@cluster1.jjt93.mongodb.net/database?retryWrites=true&w=majority"
);

//mongoose.connect("mongodb://localhost:27017/database");

const carroSchema = new mongoose.Schema({
    user: { type: String, sparse: true },
    title: { type: String, sparse: true },
    description: { type: String, sparse: true },
    code: { type: String, sparse: true },
    timestamp: { type: String, sparse: true },
    stock: { type: Number, sparse: true },
    price: { type: Number, sparse: true },
    thumbnail: { type: String, sparse: true },
    id: { type: Number, sparse: true },
    idc: { type: Number, sparse: true }

})
const carro = mongoose.model("carrito", carroSchema);

const prodSchema = new mongoose.Schema({
    title: { type: String, sparse: true },
    description: { type: String, sparse: true },
    code: { type: String, sparse: true },
    timestamp: { type: String, sparse: true },
    stock: { type: Number, sparse: true },
    price: { type: Number, sparse: true },
    thumbnail: { type: String, sparse: true },
    id: { type: Number, sparse: true }
})
const producto = mongoose.model("producto", prodSchema);

const userSchema = new mongoose.Schema({

  email: { type: String, required: false },
  password: { type: String, sparse: true },
  name: { type: String, required: false },
  address: { type: String, sparse: true },
  age: { type: Number, sparse: true },
  celPhone: { type: Number, sparse: true },
  photo: { type: String, sparse: true }
})
const userModel = mongoose.model("user", userSchema);

module.exports = {queryChart, queryProd, carro, producto, userModel};

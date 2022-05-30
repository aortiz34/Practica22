const mongoose = require("mongoose"); // se inyecta la dependencia mongoose

//se crea un nuevo esquema para ser guardado en la base de datos
let personSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    tipoSangre: String,
    nss: String

});

//el esquema anteriormente creado se exporta
module.exports = mongoose.model("Persons", personSchema); 

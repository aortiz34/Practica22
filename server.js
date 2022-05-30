const mongoose = require("mongoose"); //se inyecta la dependencia mongoose
const express = require("express"); //se inyecta la dependencia express
const personsRoutes = require("./routes/persons");

mongoose.Promise = global.Promise;
const app = express ();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use("/assets", express.static(__dirname + "/public"));
app.use(personsRoutes);


//aquí nos conectamos a nuestra base de datos, introduciendo el código que se nos arroja en mongoose
mongoose.connect(
    "mongodb+srv://felipe_lo:Fe2336915457@cluster0.4yqy3.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true,
    useUnifiedTopology: true
    }
);

//aquí pintamos algunos mensajes de mongoose dependiendo de si se conecta de manera correcta o incorrecta
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Connection successfully");
});


//se levanta el puerto y se pone en escucha
app.listen(3000); 
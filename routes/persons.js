const express = require("express"); //se inyecta la dependencia de express
const router = express.Router(); // se crea una constante de una propiedad de express, router
const mongoose = require("../node_modules/mongoose"); // se inyecta la dependencia de mongoose, la base de datos
let Person = require("../models/person"); //se define una variable "Person"

//primer ruta, para mostrarnos el contenido de nuestra base de datos
router.get("/listado", function(req,res, next){ 
    Person.find(function(err,persons){
        if(err) return next(err);
        res.render('listado', {persons});
    });
});

//segunda ruta, es un renderizado del formulario 
router.get("/person", function(req,res){

    res.render("person");
});

//tercera ruta, es la página de inicio 
router.get("/", function(req,res){

    res.render("index");
});

//cuarta ruta, hacia el listado de los datos de la base de datos
router.get("/listado", function(req,res){

    res.render("listado");
});

//ruta auxiliar para la página de inicio 
router.get("/inicio", function(req,res){

    res.render("index");
});

//ruta para eliminar a una persona
router.get("/deletePerson/:id", function(req, res, next){
    Person.findByIdAndRemove(req.params.id, req.params.body, function(err, post){
        if(err) return next(err);
        res.redirect("/listado");
    })
});


//ruta para encontrar el objeto en la base de datos através del ID
router.get("/findById/:id", function(req, res, next){
    Person.findById(req.params.id, function(err, person){
        if(err) return next(err);
        res.render("personUpdate", {person});
    });
});

//ruta para actualizar los datos del objeto persona
router.post("/updatedPerson", function(req, res, next){
    Person.findByIdAndUpdate(req.body.objId, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss}, function(err,post){
        
            if(err) return next(err);
            res.redirect("/listado");

    });
});

//primera ruta post, para guardar los datos llenados en el formulario
router.post("/personssend",function (req, res) {

    const myPerson = new Person ({
    nss: req.body.nss,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre
    });
    myPerson.save();
})




module.exports = router

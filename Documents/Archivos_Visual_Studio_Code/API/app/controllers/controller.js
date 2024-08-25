const db = require('../config/db.config.js');
const libros = require('../models/libros.js');
const Libros = db.Libros;

exports.create = (req, res) => {
    let libros = {};

    try{
        // Building Customer object from upoading request's body
        libros.Nombre_libro = req.body.Nombre_libro;
        libros.Editorial = req.body.Editorial;
        libros.Autor = req.body.Autor;
        libros.Genero = req.body.Genero;
        libros.Pais_autor = req.body.Pais_autor;
        libros.Numero_paginas = req.body.Numero_paginas;
        libros.Anio_edicion = req.body.Anio_edicion;
        libros.Precio_libro = req.body.Precio_libro;
        
    
        // Save to MySQL database
        Libros.create(libros).then(result => {   
            // send uploading message to client
            res.status(200).json({
                message: "Libro agregado con exito, con id = " + result.id,
                libros: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getLibrosById = (req, res) => {
    let librosId = req.params.id;
    Libros.findByPk(librosId)
        .then(libros => {
            res.status(200).json({
                message: " Se obtuvo con exito el libro con id = " + librosId,
                libros: libros,
            });
        })
        . catch(error => {
          // log on console
          console.log(error);
  
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  }

  exports.updateById = async (req, res) => {
    try{
        let librosId = req.params.id;
        let libro = await Libros.findByPk(librosId);
    
        if(!libro){
            // return a response to client
            res.status(404).json({
                message: "No se pudo actualizar el libro con id = " + librosId,
                libro: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                Nombre_libro : req.body.Nombre_libro,
                Editorial : req.body.Editorial,
                Autor : req.body.Autor,
                Genero : req.body.Genero,
                Pais_autor : req.body.Pais_autor,
                Numero_paginas : req.body.Numero_paginas,
                Anio_edicion : req.body.Anio_edicion,
                Precio_libro : req.body.Precio_libro,
            }
            let result = await Libros.update(updatedObject, {returning: true, where: {id: librosId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Se actualizo el libro con id = " + librosId,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> No se pudo actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let librosId = req.params.id;
        let libro = await Libros.findByPk(librosId);

        if(!libro){
            res.status(404).json({
                message: "No existe el libro con id = " + librosId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado con id = " + librosId,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}
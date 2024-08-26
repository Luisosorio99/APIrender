const db = require('../config/db.config.js');
const libros = require('../models/libros.js');
const Libros = db.Libros;
const prestamos = require('../models/prestamos.js');
const Prestamos = db.Prestamos;

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

exports.createPrestamo = (req, res) => {
    let prestamos = {};
    let prestamosId = req.params.Numero_Pedido;
    try{
        // Building Customer object from upoading request's body
        prestamos.Codigo_libro = req.body.Codigo_libro;
        prestamos.Codigo_usuario = req.body.Codigo_usuario;
        prestamos.Autor = req.body.Autor;
        prestamos.Fecha_salida = req.body.Fecha_salida;
        prestamos.FechaMax_Devolucion = req.body.FechaMax_Devolucion;
        prestamos.Fecha_devolucion = req.body.Fecha_devolucion;
        
    
        // Save to MySQL database
        Prestamos.create(prestamos).then(result => {   
            // send uploading message to client
            res.status(200).json({
                message: "Prestamo agregado con exito, con id = " + result.prestamosId,
                prestamos: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.getPrestamosById = (req, res) => {
    let prestamosId = req.params.Numero_Pedido;
    Prestamos.findByPk(prestamosId)
        .then(prestamos => {
            res.status(200).json({
                message: " Se obtuvo con exito el prestamo con id = " + prestamosId,
                prestamos: prestamos,
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

  exports.updatePrestamoById = async (req, res) => {
    try{
        let prestamosId = req.params.Numero_Pedido;
        let prestamo = await Prestamos.findByPk(prestamosId);
    
        if(!prestamo){
            // return a response to client
            res.status(404).json({
                message: "No se pudo actualizar el prestamo con id = " + prestamosId,
                libro: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                Codigo_libro : req.body.Codigo_libro,
                Codigo_usuario : req.body.Codigo_usuario,
                Autor : req.body.Autor,
                Fecha_salida : req.body.Fecha_salida,
                FechaMax_Devolucion : req.body.FechaMax_Devolucion,
                Fecha_devolucion : req.body.Fecha_devolucion,
            }
            let result = await Prestamos.update(updatedObject, {returning: true, where: {Numero_Pedido: prestamosId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el prestamo con id = " + req.params.Numero_Pedido,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Se actualizo el prestamo con id = " + prestamosId,
                prestamo: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> No se pudo actualizar el prestamo con id = " + req.params.Numero_Pedido,
            error: error.message
        });
    }
}
exports.deletePrestamoById = async (req, res) => {
    try{
        let prestamosId = req.params.Numero_Pedido;
        let prestamo = await Prestamos.findByPk(prestamosId);

        if(!prestamo){
            res.status(404).json({
                message: "No existe el prestamo con id = " + prestamosId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Prestamo eliminado con id = " + prestamosId,
                prestamo: prestamo,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el prestamo con id = " + req.params.id,
            error: error.message,
        });
    }
}

exports.GetAllPrestamos = (req, res) => {
    // find all Customer information from 
    Prestamos.findAll(Numero_Pedido)
        .then(prestamosInfos => {
            res.status(200).json({
                message: "Todos los prestamos :' Infos Successfully!",
                prestamos: prestamosInfos
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

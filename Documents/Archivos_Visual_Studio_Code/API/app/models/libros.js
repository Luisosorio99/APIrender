
module.exports = (sequelize, Sequelize) => {
	const Libros = sequelize.define('libros', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Nombre_libro: {
			type: Sequelize.STRING
	  },
	  Editorial: {
			type: Sequelize.STRING
  	},
	  Autor: {
			type: Sequelize.STRING
	  },
	  Genero: {
			type: Sequelize.STRING
    },
	  Pais_autor: {
			type: Sequelize.STRING
    },
      Numero_paginas: {
			type: Sequelize.INTEGER
    },
      Anio_edicion: {
			type: Sequelize.DATE
    },
      Precio_libro: {
			type: Sequelize.STRING
    },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG'
    }
	});
	
	return Libros;
}
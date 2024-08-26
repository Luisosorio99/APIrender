
module.exports = (sequelize, Sequelize) => {
	const Prestamos = sequelize.define('prestamos', {	
	  Numero_Pedido: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Codigo_libro: {
			type: Sequelize.INTEGER
	  },
	  Codigo_usuario: {
			type: Sequelize.INTEGER
  	},
	  Fecha_salida: {
			type: Sequelize.DATE
	  },
	  FechaMax_Devolucion: {
			type: Sequelize.DATE
    },
	  Fecha_devolucion: {
			type: Sequelize.DATE
    }

	});
	
	return Prestamos;
}
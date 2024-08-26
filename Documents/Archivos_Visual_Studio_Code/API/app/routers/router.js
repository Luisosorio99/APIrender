let express = require('express');
let router = express.Router();

const Libros = require('../controllers/controller.js');
const Prestamos = require('../controllers/controller.js');

router.post('/api/create', Libros.create);
router.get('/api/:id', Libros.getLibrosById);
router.put('/api/actualizar/:id', Libros.updateById);
router.delete('/api/eliminar/:id', Libros.deleteById);

router.post('/api/prestamo/crear', Prestamos.createPrestamo);
router.get('/api/prestamo/:Numero_Pedido', Prestamos.getPrestamosById);
router.put('/api/actualizar/:Numero_Pedido', Prestamos.updatePrestamoById);
router.delete('/api/eliminar/:Numero_Pedido', Prestamos.deletePrestamoById);
router.get('/api/all', Prestamos.GetAllPrestamos);



module.exports = router;
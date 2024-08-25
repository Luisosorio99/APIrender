let express = require('express');
let router = express.Router();

const Libros = require('../controllers/controller.js');

router.post('/api/create', Libros.create);
router.get('/api/:id', Libros.getLibrosById);
router.put('/api/actualizar/:id', Libros.updateById);
router.delete('/api/eliminar/:id', Libros.deleteById);

module.exports = router;
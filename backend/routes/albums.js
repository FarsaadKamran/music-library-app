const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/', albumController.getAll);
router.get('/:id', albumController.getOne);
router.post('/', albumController.create);
router.put('/:id', albumController.update);
router.delete('/:id', albumController.remove);

module.exports = router;
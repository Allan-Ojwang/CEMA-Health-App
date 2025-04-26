const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/clients', clientController.createClient);
router.get('/clients/:id', clientController.getClient);

module.exports = router;

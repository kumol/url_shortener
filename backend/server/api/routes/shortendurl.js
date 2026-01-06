const express = require('express');
const router = express.Router();
const ShortendUrlController = require('../../controllers/ShortendUrlController');
const AuthService = require('../../services/AuthService');
router.post('/create', AuthService.checkAuth, ShortendUrlController.createShortendUrl);
router.get('/stats', AuthService.checkAuth, ShortendUrlController.getShortendUrlStats);
router.delete('/delete/:id', AuthService.checkAuth, ShortendUrlController.deleteShortendUrl);

module.exports = router;
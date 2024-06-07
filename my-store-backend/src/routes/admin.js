const express = require('express');
const adminControllers = require('../controllers/admin');

const upload = require("../../multer");
const { verifyTokenAndAdminAuth } = require('../middleware/auth');
const router = express.Router();

// router.get('/products', adminControllers.getDetailProduct)
router.post('/add-product', upload.array('image'), adminControllers.postAddProduct)
router.delete('/product/:id', adminControllers.removeProduct)


module.exports = router;
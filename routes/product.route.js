const express = require('express');
const { checkAuth } = require('../middlewares/auth/auth');
const { isAuthorize } = require('../middlewares/roles');
const { addPoduct } = require('../controllers/admin/admin.product.controller');
const { products } = require('../controllers/product.controller');
const router = express.Router();

router.post('/add',checkAuth, isAuthorize(['ADMIN']), addPoduct);
router.get('/list',products);

module.exports = router;
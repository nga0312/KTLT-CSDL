const express = require('express');
const router = express.Router();
const itemController = require('../controller/item.controller');

router.get('/', itemController.get);
router.post('/', itemController.post);
// router.put('/put', userController.put);

module.exports = router;
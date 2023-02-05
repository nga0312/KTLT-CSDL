//Hưng

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

const multer = require('multer');
const path = require('path')

//upload img
const storage = multer.diskStorage({
	destination: './client/img',
	filename:(req, file, cb) =>{
		cb(null, file.originalname)
	}
})

const upload = multer({
	storage: storage
});


router.get('/', itemController.get);
router.post('/', upload.single("image") ,itemController.post);
// router.put('/put', userController.put);

module.exports = router;
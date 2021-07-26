const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validations = require('../helpers/validations')

router.post('/add', validations.validationSchema, userController.createUser);
router.get('/getAll', userController.getAllUsers)
router.get('/user/:id', userController.getUser);
router.put('/update/:id', validations.validationSchema, userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);                          
router.post('/uploadimg/:id', userController.uploadImg);

module.exports = router;
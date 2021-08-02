"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const validations = require('../utils/validations');
router.post('/add', validations.validationSchema, userController.createUser);
router.get('/getAll', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.put('/update/:id', validations.validationSchema, userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.post('/uploadimg/:id', uploadController.uploadImg);
module.exports = router;
//# sourceMappingURL=user.routes.js.map
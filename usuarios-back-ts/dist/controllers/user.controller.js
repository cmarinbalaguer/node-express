"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService = require('../service/user.service');
exports.createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService.createUser(req.body);
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield userService.getAllUsers();
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const userResponse = yield userService.getUser(id);
        res.send(userResponse);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const response = yield userService.uploadUser(id, req.body);
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const response = yield userService.deleteUser(id);
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=user.controller.js.map
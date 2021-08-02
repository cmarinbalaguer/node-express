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
const userModel = require('../models/user.model');
exports.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userModel.createUser(user);
        return { data: newUser, status: 'OK' };
    }
    catch (err) {
        return err;
    }
});
exports.getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.getAllUsers();
        return { data: users, status: 'OK' };
    }
    catch (err) {
        return err;
    }
});
exports.getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.getUser(id);
        return { data: user, status: 'OK' };
    }
    catch (err) {
        return err;
    }
});
exports.uploadUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel.uploadUser(id, user);
        return { status: 'OK' };
    }
    catch (err) {
        return err;
    }
});
exports.deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel.deleteUser(id);
        return { status: 'OK' };
    }
    catch (err) {
        return err;
    }
});
//# sourceMappingURL=user.service.js.map
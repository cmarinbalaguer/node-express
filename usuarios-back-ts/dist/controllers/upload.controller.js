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
const upload = require('../service/upload.service');
const userServices = require('../service/user.service');
exports.uploadImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const route = `public/uploads/img/${id}`;
        console.log(req.files);
        const response = yield upload.uploadfile(req.files, route);
        yield userServices.uploadUser(id, { img: `${route}/${response.data.name}` });
        res.send(response);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
//# sourceMappingURL=upload.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.validationSchema = (req, res, next) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().alphanum(),
        fullName: joi_1.default.string().alphanum().min(3).max(25).trim(true).required(),
        phone: joi_1.default.string().required(),
        email: joi_1.default.string().email().trim(true).required(),
        activo: joi_1.default.bool().default(false)
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    else {
        req.body = value;
        next();
    }
};
//# sourceMappingURL=validations.js.map
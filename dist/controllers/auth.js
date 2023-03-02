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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = __importDefault(require("../models/users"));
const generate_jwt_1 = __importDefault(require("../helpers/generate_jwt"));
const userAuthentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const query = users_1.default.where({ email: email });
        const userLogin = yield query.findOne();
        if (!userLogin) {
            return res.status(400).json({
                msg: 'Verifica tus credenciales'
            });
        }
        if (!userLogin.enabled) {
            return res.status(400).json({
                msg: 'El usuario esta desactivado'
            });
        }
        const validatePassword = bcryptjs_1.default.compareSync(password, userLogin.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'Verifica tus credenciales'
            });
        }
        const token = yield (0, generate_jwt_1.default)(userLogin.id);
        res.status(200).json({
            user: userLogin,
            token
        });
    }
    catch (error) {
        res.status(400).json({
            msg: error
        });
    }
});
exports.userAuthentication = userAuthentication;
//# sourceMappingURL=auth.js.map
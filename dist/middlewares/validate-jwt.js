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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const uid = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const userAutenticado = yield users_1.default.findById(uid);
        console.log(uid);
        if (!userAutenticado) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe'
            });
        }
        // //Verificar si el usuario esta activo
        // if( !userAutenticado.state ){
        //     return res.status(401).json({
        //         msg: 'Token no valido - Usuario desactivado'
        //     });
        // }
        // req.usuario = userAutenticado;
        // next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
module.exports = {
    validarJWT
};
//# sourceMappingURL=validate-jwt.js.map
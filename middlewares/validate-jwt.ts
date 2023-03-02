import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/users";



const validarJWT = async( req: Request, res: Response, next: NextFunction )=>{
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }

    try {
        const uid = jwt.verify( token, process.env.SECRETORPRIVATEKEY! );
        const userAutenticado =await User.findById( uid );

        console.log( uid );

        if( !userAutenticado){
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

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/users";
import generateJWT from "../helpers/generate_jwt";

export const userAuthentication = async ( req: Request, res: Response ) => {

    const { email, password } = req.body;
    try {
        
        const query = User.where({ email: email });
        const userLogin = await query.findOne();

        if( !userLogin ){
            return res.status( 400 ).json({
                msg: 'Verifica tus credenciales'
            });
        }

        if( !userLogin.enabled ){
            return res.status( 400 ).json({
                msg: 'El usuario esta desactivado'
            });
        }

        const validatePassword = bcryptjs.compareSync( password, userLogin.password );    

        if( !validatePassword ){
            return res.status( 400 ).json({
                msg: 'Verifica tus credenciales'
            });
        }

        const token = await generateJWT( userLogin.id );        

        res.status( 200 ).json({
            user: userLogin,
            token
        });

    } catch (error) {
        res.status( 400 ).json({
            msg: error
        });
    }

}
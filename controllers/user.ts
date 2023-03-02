import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/users";

export const getUsuarios = ( req: Request, res: Response ) => {
    res.status(200).json({
        msg: 'getUsuarios'
    });
}


export const getUsuario = ( req: Request, res: Response ) =>{

    const { id } = req.params;

    res.status(200).json({
        msg: 'getUsuario',
        id
    });
}


export const postUsuario = async ( req: Request, res: Response ) =>{

    const { name, lastname, email, password } = req.body;

    const userExist = await User.where({
        email
    });
        
    if( userExist.length !== 0 ){
        return res.status( 400 ).json({
            msg: 'Email already exists',
            email
        });
    }

    const user = new User({
        name,lastname,email
    });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    await user.save();
    res.status(200).json({
        msg: 'User created',
        user
    });
}


export const putUsuario = ( req: Request, res: Response ) =>{

    const { id } = req.params;

    res.status(200).json({
        msg: 'put',
        id
    });
}


export const deleteUsuario = ( req: Request, res: Response ) =>{

    const { id } = req.params;

    res.status(200).json({
        msg: 'delete',
        id
    });
}



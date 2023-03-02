import { Request, Response } from "express";

export const getUsuarios = ( req: Request, res: Response ) => {
    
    const { id } = req.params;

    res.status(200).json({
        msg: 'getUsuarios',
        id
    });
}


export const getUsuario = ( req: Request, res: Response ) =>{

    const { id } = req.params;

    res.status(200).json({
        msg: 'getUsuario',
        id
    });
}


export const postUsuario = ( req: Request, res: Response ) =>{

    const { id } = req.params;

    res.status(200).json({
        msg: 'post',
        id
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



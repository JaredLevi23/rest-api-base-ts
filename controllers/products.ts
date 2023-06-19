import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Categories from "../models/categories";
import Products from "../models/products";

export interface ProductInterface {
    name:string | undefined;
    description:string;
    exists: Number;
    price: Number;
    category: {
        name: string,
        description: string
    };
    car: string
}

export const getProductos = async ( req: Request, res: Response ) => {

    const products: ProductInterface[] = await Products.where({ enabled:true }).populate({
        path: 'category',
        transform: ( doc, id ) => doc.name
    });

    return res.status( 200 ).json({
        msg: 'Productos',
        products
    });

}

export const getProductoByQuery = async ( req: Request, res: Response ) => {

    const { query } = req.params;

    const products: ProductInterface[] = await Products.where({ 
        enabled:true, 
        name: { $regex: query, $options: 'i' }
    }).limit(15).populate({
        path: 'category',
        transform: ( doc, id ) => doc.name
    });

    return res.status( 200 ).json({
        msg: 'Productos',
        products
    });

}

export const getProductByCategory = async ( req: Request, res: Response ) => {

    const{ category } = req.params;

    const existsCategory = await Categories.where({ _id: category } ).findOne();

    if( !existsCategory ){
        return res.status( 200 ).json({
            msg: 'La categoria no existe',
            products: []
        });    
    }

    if( existsCategory.name === 'TODAS' ){

        const products: ProductInterface[] = await Products.where({ enabled:true }).populate({
            path: 'category',
            transform: ( doc, id ) => doc.name
        });
        return res.status( 200 ).json({
            msg: 'Productos',
            products
        });

    }else{

        const products: ProductInterface[] = await Products.where({ enabled:true, category }).populate({
            path: 'category',
            transform: ( doc, id ) => doc.name
        });

        return res.status( 200 ).json({
            msg: 'Productos',
            products
        });
    }

    return res.status( 200 ).json({
        msg: 'Productos',
        products: []
    });
}

export const postProduct = async ( req: Request, res: Response ) => {

    const { name, price, description, category, exists,  } = req.body;

    const existsCategory = await Categories.where({ _id: category } ).findOne()

    if( !category ){
        return res.status( 400 ).json({
            msg: 'La categoria no existe',
        });    
    }

    const product = new Products({
        name, price, description, category, exists
    });

    await product.save();

    return res.status( 201 ).json({
        msg: 'Producto creado',
        product
    });
}

export const putProduct = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { ...data } = req.body;
    const product = await Products.findById( id );

    if( !product ){
        return res.status( 202 ).json({
            msg: 'Producto no encontrado',
            product: id
        });     
    }

    const existProduct = await Products.findByIdAndUpdate( id, data , { new: true });

    return res.status( 202 ).json({
        msg: 'Producto actualizado',
        product: existProduct
    }); 
}

export const deleteProduct = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const product = await Products.findById( id );

    if( !product ){
        return res.status( 406 ).json({
            msg: 'El producto no existe',
            product: id
        });
    }

    const productDelete = await Products.findByIdAndUpdate( id, { enabled: false }, { new: true });

    return res.status( 202 ).json({
        msg: 'Producto eliminado',
        product: productDelete
    });
}
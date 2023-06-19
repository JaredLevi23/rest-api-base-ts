import { Request, Response } from "express";
import Car from "../models/car";
import Categories from "../models/categories";
import Products from "../models/products";
import User from "../models/users";
import { ProductInterface } from "./products";


export const getCarById = ( req: Request, res: Response ) =>{

    const { idu } = req.params;


}

export const postCar = async ( req: Request, res: Response ) =>{

    const { idu, idp } = req.params;
    const { car } = req.body;

    const user = await User.findById( idu );
    const product = await Products.findById( idp );

    if( !user ){
        return res.status( 400 ).json({
            msg: 'El usuario no existe',
        });
    }

    if( !product ){
        return res.status( 400 ).json({
            msg: 'El producto no existe',
        });
    }

    product.car = car;

    const newCar = new Car({
        user,
        products: [product]
    });

    await newCar.save();

    return res.status( 201 ).json({
        msg: 'Car creado',
        car: newCar
    });
}

export const putCar = async ( req: Request, res: Response ) =>{

    const { idc } = req.params;
    const { car, idp } = req.body;

    const existCar = await Car.findById( idc );

    if( !existCar ){
        return res.status( 400 ).json({
            msg: 'El carro no existe',
        });
    }

    const product = await Products.findById( idp );
    
    if( !product ){
        return res.status(200).json({
            msg: 'El producto no existe'
        });
    }

    let products = existCar.products;
    let con = false;

    for (let index = 0; index < products.length; index++) {
        if( product._id.equals( products[index]._id ) ){
            con = true;
        }
    }

    if( con ){
        
        for (let index = 0; index < products.length; index++) {
            if( product._id.equals( products[index]._id ) ){
                if( car <= 0 ){
                    delete( products[ index ] );
                    await Car.findByIdAndUpdate( idc, { products: [ ...products ]});
                }else{
                    products[index].car = car;
                    await Car.findByIdAndUpdate( idc, { products: [ ...products ]});
                }
            }
        }

        const data: ProductInterface[] = products;

        return res.status(200).json({
            msg: 'Carrito actualizado',
            products: data
        });
    }else{
        if( car > 0 ){
            product.car = car;
            const newData = [ ...products, product ];
            await Car.findByIdAndUpdate( idc, { products: [ ...newData ]}, { new: true });
            const data: ProductInterface[] = newData;

            return res.status(200).json({
                msg: 'Carrito actualizado',
                products: data 
            });
        }
        return res.status(200).json({
            msg: 'Carrito actualizado',
        });
    }

    
}

export const deleteCar = async ( req: Request, res: Response ) =>{

    const { id } = req.params;

    const category = await Categories.where({ _id: id } ).findOne();

    if( !category ){
        return res.status( 400 ).json({
            msg: 'La categoria no existe',
            category: id
        });
    }

    const update = await Categories.findByIdAndUpdate( id, { enabled: false }, { new: true }  );
    
    return res.status(200).json({
        msg: 'Categoria actualizada',
        category: update
    });

}
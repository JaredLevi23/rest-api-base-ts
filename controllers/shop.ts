import { Request, Response } from "express";
import Products from "../models/products";
import Shop from "../models/shop";
import User from "../models/users";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ProductInterface } from "./products";


interface ShopInterface {
    date: String;
    uid: String;
    products: ProductInterface [] 
}


export const getShops = async ( req: Request, res: Response ) =>{

    const token = req.header('x-token');
    const { uid } = jwt.verify( token!, process.env.SECRETORPRIVATEKEY ?? '' ) as JwtPayload;

    const userAuth =await User.findOne( { '_id': uid });
    if( !userAuth){
        return res.status(401).json({
            msg: 'Token no valido - Usuario no existe'
        });
    }

    const shops = await Shop.where({ user: userAuth._id });

    const shl = shops.map( ( element )=>{

        console.log('Element: ', element);

        const data: [] = element.products;

        const pr = data.map( ( p:any )=>{
            return {
                uid: p._id,
                name: p.name,
                price: p.price,
                exists: p.exists,
                description: p.description,
                category: p.category,
                car: p.car
            }
        });

        
        return {
            uid: element._id,
            user: element.user,
            date: element.date,
            products: pr
        }
    });

    console.log( shl );
    

    if( !shops ){
        return res.status( 200 ).json({
            msg: 'No hay compras',
            shops
        });
    }

    return res.status( 200 ).json({
        msg: 'Historial de compras',
        shops: shl
    });

}


export const postShop = async ( req: Request, res:Response ) =>{ 

    const token = req.header('x-token');
    const { uid } = jwt.verify( token!, process.env.SECRETORPRIVATEKEY ?? '' ) as JwtPayload;

    const userAuth =await User.findOne( { '_id': uid });
    if( !userAuth){
        return res.status(401).json({
            msg: 'Token no valido - Usuario no existe'
        });
    }
    // //Verificar si el usuario esta activo
    if( !userAuth.enabled ){
        return res.status(401).json({
            msg: 'Usuario desactivado'
        });
    }

    const { products } = req.body;

    const productList = [];

    for (let index = 0; index < products.length; index++) {
        const productFind = await Products.findById( products[index].uid );

        if( productFind ){
            productFind.car = products[ index ].car;
            productFind.uid = products[ index ].uid;
            const changeExists = productFind.exists! - productFind.car;
            productList.push( productFind );
            await Products.findByIdAndUpdate( products[index].uid, { exists: changeExists } );
        }
    }


    const shop = new Shop({
        user: userAuth,
        products: productList
    });

    await shop.save();

    return res.status( 200 ).json({
        msg: 'Pedido guardado',
        shop
    });
}

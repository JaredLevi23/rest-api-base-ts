import express, { Application } from "express";

import auth  from "../routes/auth";
import categories  from "../routes/categories";
import products  from "../routes/products";
import users from "../routes/user";
import car from "../routes/car";
import shop from "../routes/shop";

import cors from "cors";
import db from "../db/connection";

class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        auth : '/api/auth',
        car: '/api/car',
        categories: '/api/categories',
        products: '/api/products',
        shop: '/api/shop',
        users: '/api/users',
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.connectionDB();

        // middlewares
        this.middlewares();

        // routes
        this.routes();
    }

    async connectionDB(){
        try {

            await db();
            
            
        } catch (error) {
            console.log( error );
            
        }
    }

    middlewares(){
        // Cors
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.apiPaths.auth, auth );
        this.app.use( this.apiPaths.categories, categories );
        this.app.use( this.apiPaths.products, products );
        this.app.use( this.apiPaths.users, users );
        this.app.use( this.apiPaths.car, car );
        this.app.use( this.apiPaths.shop, shop );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }

}

export default Server;
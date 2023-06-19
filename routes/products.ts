import { Router } from "express";
import { check } from "express-validator";
import { deleteProduct, getProductByCategory, getProductoByQuery, getProductos, postProduct, putProduct } from "../controllers/products";
import { findCategory } from "../middlewares/validate-data";
import { validation } from "../middlewares/validate-fields";
import { validarJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get(
    '/',
    [
        validarJWT,
        validation
    ],
    getProductos
);

router.get(
    '/:category' ,
    [
        validarJWT,
        check('category', 'El query es obligatorio').notEmpty(),
        validation
    ],
    getProductByCategory
);

router.get(
    '/search/:query' ,
    [
        validarJWT,
        check('query', 'El query es obligatorio').notEmpty(),
        validation
    ],
    getProductoByQuery
);

router.post(
    '/',
    [
        validarJWT,
        check('name','El nombre es obligatorio').notEmpty(),
        check('category','La categoria es obligatoria').isMongoId(),
        check( 'category' ).custom( findCategory ),
        check('description','La descripcion es obligatorio').notEmpty(),
        check('price','El precio es obligatorio').notEmpty(),
        check('exists','La existencia es obligatoria').notEmpty(),
        validation
    ],
    postProduct
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id','El id del producto es obligatorio').isMongoId(),
        validation
    ],
    putProduct
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id','El id del producto es obligatorio').isMongoId(),
        validation
    ],
    deleteProduct
);

export default router;
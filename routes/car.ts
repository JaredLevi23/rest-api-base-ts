import { Router } from "express";
import { check } from "express-validator";
import { postCar, putCar } from "../controllers/car";

import { validation } from "../middlewares/validate-fields";
import { validarJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get(
    '/:id',
    [
        validarJWT,
        check( 'id', 'No se otorgo el id de la categoria' ),
        validation
    ],
    
);

router.post(
    '/:idu/:idp',
    [
        validarJWT,
        check( 'idu', 'El id del usaurio es obligatorio' ).isMongoId(),
        check( 'idp', 'El id del producto es obligatorio' ).isMongoId(),
        check( 'car', 'El car es obligatorio' ).isNumeric(),
        validation
    ],
    postCar
);

router.put(
    '/:idc',
    [
        validarJWT,
        check( 'idc', 'El id del car es obligatorio' ).isMongoId(),
        check( 'idp', 'El id del producto es obligatorio' ).isMongoId(),
        check( 'car', 'El car es obligatorio' ).isNumeric(),
        validation
    ],
    putCar
);

router.delete(
    '/:idu',
    [
        validarJWT,
        check( 'idu', 'El id del usaurio es obligatorio' ).isMongoId(),
        check( 'idp', 'El id del producto es obligatorio' ).isMongoId(),
        validation
    ],
    
);


export default router;

import { Router } from "express";
import { check } from "express-validator";
import { getShops, postShop } from "../controllers/shop";
import { validation } from "../middlewares/validate-fields";
import { validarJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get(
    '/',
    [
        validarJWT,
        validation
    ],
    getShops
);

router.post(
    '/',
    [
        validarJWT,
        check('products','La lista de productos es obligatoria').notEmpty(),
        validation
    ],
    postShop
);

export default router;
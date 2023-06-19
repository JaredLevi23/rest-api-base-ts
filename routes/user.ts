import { Router } from "express";
import { check } from "express-validator";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/user";
import { validation } from "../middlewares/validate-fields";
import { validarJWT } from "../middlewares/validate-jwt";

const router = Router();

router.get(
    '/',
    [],
    getUsuarios
);

router.get(
    '/:id',
    [],
    getUsuario
);

router.post(
    '/',
    [
        check( 'email', 'El nombre es obligatorio' ).isEmail(),
        check( 'name', 'El nombre es obligatorio' ).notEmpty(),
        check( 'lastname', 'El apellido es obligatorio' ).notEmpty(),
        check( 'password', 'La contraseña es obligatoria' ).notEmpty(),
        validation
    ],
    postUsuario
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'El id debe ser valido' ).isMongoId(),
        validation
    ],
    putUsuario
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'El id debe ser valido' ).isMongoId(),
        validation
    ],
    deleteUsuario
);

export default router;
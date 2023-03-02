import { Router } from "express";
import { check } from "express-validator";
import { userAuthentication } from "../controllers/auth";
import { validation } from "../middlewares/validate-fields";

const router = Router();

router.post(
    '/',
    [
        check( 'email', 'El correo electronico es obligatorio' ).isEmail(),
        check( 'password', 'La contraseña es obligatoria' ).notEmpty(),
        validation
    ],
    userAuthentication
);



export default router;
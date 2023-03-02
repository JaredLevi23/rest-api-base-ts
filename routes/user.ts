import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/user";

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
    [],
    postUsuario
);

router.put(
    '/',
    [],
    putUsuario
);

router.delete(
    '/',
    [],
    deleteUsuario
);

export default router;
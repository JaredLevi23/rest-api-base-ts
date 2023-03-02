"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/', [], user_1.getUsuarios);
router.get('/:id', [], user_1.getUsuario);
router.post('/', [], user_1.postUsuario);
router.put('/', [], user_1.putUsuario);
router.delete('/', [], user_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=user.js.map
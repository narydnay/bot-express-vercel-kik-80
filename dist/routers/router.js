"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
exports.route = (0, express_1.Router)();
exports.route.get('/test', (req, res) => {
    res.status(200).json({ message: 'send 2 message success!' });
});
//# sourceMappingURL=router.js.map
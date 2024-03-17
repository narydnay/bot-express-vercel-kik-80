"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const upload_1 = require("../controllers/upload");
const adminCustom_1 = require("../controllers/adminCustom");
const modelsPostgress_1 = require("../models/modelsPostgress");
exports.route = (0, express_1.Router)();
exports.route.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = new modelsPostgress_1.queryDataBasePostgress();
        const result = yield db.getData();
        res.status(200).json({ message: 'send message success!', res: JSON.stringify(result, null, 4) });
    }
    catch (error) {
        res.status(500).json({ message: `Error! ${error.message}` });
    }
}));
exports.route
    .get('/kik-admin', adminCustom_1.adminCustom)
    .post('/upload-csv', upload_1.uploadCsv)
    .post('/upload-xls', upload_1.uploadXls);
//# sourceMappingURL=router.js.map
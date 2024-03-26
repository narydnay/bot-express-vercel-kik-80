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
exports.adminAccess = exports.adminUsers = void 0;
const modelsPostgress_1 = require("../models/modelsPostgress");
const adminUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new modelsPostgress_1.queryDataBasePostgress();
    try {
        const result = yield db.getData('users', '*', '', 'id');
        // console.log(result)
        return res.status(200).json({
            info: {
                status: true,
                message: 'Добро пожаловать adminUsers'
            },
            count: result.length,
            results: result
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.adminUsers = adminUsers;
const adminAccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new modelsPostgress_1.queryDataBasePostgress();
    try {
        // console.log(req)
        const { is_active, id_telegram } = req.body;
        const where = `id_telegram = ${id_telegram}`;
        const data = `is_active = ${is_active}, is_blocked = ${!is_active}`;
        const result = yield db.putData('users', where, data, '*');
        return res.status(200).json({
            info: {
                status: true,
                message: 'Данные были изменнены'
            },
            count: result.length,
            results: result
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.adminAccess = adminAccess;
//# sourceMappingURL=adminUsers.js.map
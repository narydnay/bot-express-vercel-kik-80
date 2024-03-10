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
const models_1 = require("../models/models");
exports.route = (0, express_1.Router)();
const db = new models_1.queryDataBase();
exports.route.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listPrisoner = yield db.getDataFromDb({ nameField: 'name', qOperant: '!=', value: false });
        res.status(200).json({ message: 'send 3 message success!', listPrisoner });
    }
    catch (error) {
        res.status(500).json({ message: `Error! ${error.message}` });
    }
}));
//# sourceMappingURL=router.js.map
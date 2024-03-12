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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const models_js_1 = __importDefault(require("../models/models.js"));
const upload_1 = require("../controllers/upload");
const adminCustom_1 = require("../controllers/adminCustom");
const storage_1 = require("firebase/storage");
const app_1 = require("firebase/app");
const app = (0, app_1.initializeApp)({
    apiKey: "AIzaSyDArYuP8lbb94JbErr6Y3xKwQS2oPE_zTc",
    authDomain: "t-b-kik-80.firebaseapp.com",
    projectId: "t-b-kik-80",
    storageBucket: "t-b-kik-80.appspot.com",
    messagingSenderId: "513130161339",
    appId: "1:513130161339:web:10285471a898b1a7f5759e",
    measurementId: "G-D1X8CLDW6X"
});
const firebaseApp = (0, app_1.getApp)();
exports.route = (0, express_1.Router)();
const db = new models_js_1.default();
exports.route.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = (0, storage_1.getStorage)(firebaseApp, "gs://t-b-kik-80.appspot.com");
        const spaceRef = (0, storage_1.ref)(storage, '/cards_prisoner/Азамат Іван Миколайович {23.02.1995}.JPG');
        const link = yield (0, storage_1.getDownloadURL)(spaceRef);
        res.status(200).json({ message: 'send 3 message success!', res: JSON.stringify(spaceRef, null, 4) });
    }
    catch (error) {
        res.status(500).json({ message: `Error! ${error.message}` });
    }
}));
exports.route
    .get('/kik-admin', adminCustom_1.adminCustom)
    .post('/upload-csv', upload_1.uploadCsv);
//# sourceMappingURL=router.js.map
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
exports.uploadCsv = exports.uploadXls = void 0;
const multer_1 = __importDefault(require("multer"));
const sync_1 = require("csv-parse/sync");
const modelsPostgress_1 = require("../models/modelsPostgress");
const xlsx_1 = require("xlsx");
const uploadXls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = new modelsPostgress_1.queryDataBasePostgress();
        const upload = (0, multer_1.default)().single('upload_xls');
        upload(req, res, function (err) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err instanceof multer_1.default.MulterError) {
                    // Случилась ошибка Multer при загрузке.
                    return res.status(500).json({
                        info: {
                            message: 'Сталася помилка Multer під час завантаження. Зв\'яжіться з адміністратором.',
                            status: false
                        }
                    });
                }
                else {
                    try {
                        const { file } = req;
                        console.log({ file });
                        if (Object.keys(file).length) {
                            const { fieldname, originalname, encoding, mimetype, buffer, size } = file;
                            const result = yield db.setData((0, xlsx_1.read)(buffer).Sheets["Діюча"], 'diucha');
                            // return res.status(200).json({result})
                            return res.status(200).json({
                                info: {
                                    message: 'Файл успішно завантажено.',
                                    status: true
                                }
                            });
                        }
                    }
                    catch (error) {
                        // При загрузке произошла неизвестная ошибка.
                        console.log({ error });
                        return res.status(500).json({
                            info: {
                                message: 'Під час завантаження сталася невідома помилка.' + JSON.stringify(error.message),
                                status: false
                            }
                        });
                    }
                }
            });
        });
    }
    catch (error) {
        return res.status(500).json(({
            info: {
                message: 'problem obtain',
                status: false
            }
        }));
    }
});
exports.uploadXls = uploadXls;
const uploadCsv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new modelsPostgress_1.queryDataBasePostgress();
    const upload = (0, multer_1.default)().single('upload_csv');
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err instanceof multer_1.default.MulterError) {
                // Случилась ошибка Multer при загрузке.
                return res.status(500).json({
                    info: {
                        message: 'Сталася помилка Multer під час завантаження. Зв\'яжіться з адміністратором.',
                        status: false
                    }
                });
            }
            else {
                try {
                    const { file } = req;
                    if (Object.keys(file).length) {
                        const { fieldname, originalname, encoding, mimetype, buffer, size } = file;
                        // console.log({ fieldname, originalname, encoding, mimetype, buffer, size })
                        const data = yield (0, sync_1.parse)(buffer);
                        for (let prisoner of data) {
                            const prisonerData = {
                                name: prisoner[0],
                                full_age: prisoner[1],
                                otd: prisoner[2],
                                code_article: prisoner[3],
                                period_punish: prisoner[4],
                                image_url: prisoner[0] + '{' + prisoner[1] + '}',
                                isGuard: true
                            };
                            db.setData(prisonerData, 'diucha');
                        }
                    }
                    return res.status(200).json({
                        info: {
                            message: 'Файл успішно завантажено.',
                            status: true
                        }
                    });
                }
                catch (error) {
                    // При загрузке произошла неизвестная ошибка.
                    return res.status(500).json({
                        info: {
                            message: 'Під час завантаження сталася невідома помилка.',
                            status: false
                        }
                    });
                }
            }
        });
    });
    return;
});
exports.uploadCsv = uploadCsv;
//# sourceMappingURL=upload.js.map
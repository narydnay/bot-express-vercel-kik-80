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
exports.queryDataBasePostgress = void 0;
const pg_1 = require("pg");
const helper_1 = require("../helpers/helper");
const pool = new pg_1.Pool({
    host: '193.0.61.232',
    port: 6432,
    database: 'kik',
    user: 'admin',
    password: 'oSLxPwYigQkKZoNAacRRNTFX3HD69IO9SEFpJhE0wyzyhUAwDd',
});
class queryDataBasePostgress {
    constructor() {
        this.client = pool.connect();
    }
    setData(data, nameDb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let initDataObject = {
                    name: '',
                    full_age: '',
                    otd: '',
                    code_article: '',
                    period_punish: '',
                };
                let listData = [];
                let currentData = {};
                let dataObject = {};
                let resultSend = 'send';
                for (let i = 4; i < 9999; i++) {
                    dataObject = initDataObject;
                    for (let key of Object.keys(data)) {
                        if (data['E' + i] === undefined)
                            break;
                        if (key === '!margins' || key === '!autofilter') { }
                        else {
                            if (key.includes(i)) {
                                `//  П.І.Б. "name": "Єгоров Андрій Олексійович",`;
                                if ('E' + i === key) {
                                    let full_name = data[key]['v'].trim().replace('  ', ' ');
                                    const pib = full_name.split(' ');
                                    dataObject = Object.assign(Object.assign({}, dataObject), { name: full_name });
                                }
                                //  Дата народження `"full_age": "04.09.1964",`
                                if ('F' + i === key) {
                                    dataObject = Object.assign(Object.assign({}, dataObject), { full_age: (0, helper_1.ExcelDateToJSDate)(data[key]['v']) });
                                }
                                //  від `"otd": "16"`
                                if ('G' + i === key) {
                                    dataObject = Object.assign(Object.assign({}, dataObject), { otd: data[key]['v'] });
                                }
                                //  Статті КК України                           `"code_article": "307ч2, 72ч5",`
                                if ('L' + i === key) {
                                    dataObject = Object.assign(Object.assign({}, dataObject), { code_article: data[key]['v'] });
                                }
                                //  Строк покарання                             `"period_punish": "6р.п/в з конф.ос/м",`
                                if ('M' + i === key) {
                                    dataObject = Object.assign(Object.assign({}, dataObject), { period_punish: data[key]['v'] });
                                }
                            }
                        }
                    }
                    if (dataObject === null || dataObject === void 0 ? void 0 : dataObject.name) {
                        try {
                            //  заносим данные в бд
                            let options = {};
                            // console.log('date = ', dataObject)
                            // console.log('date 1 = ', dataObject.full_age?.toLocaleDateString("tr-TR"))
                            // console.log({dataObject})
                            const subBase = (dataObject === null || dataObject === void 0 ? void 0 : dataObject.name) + ' {' + (dataObject === null || dataObject === void 0 ? void 0 : dataObject.full_age.toLocaleDateString("tr-TR", options)) + '}';
                            console.log(`${i - 3}`, { subBase });
                            const keys = Object.keys(dataObject).join(',');
                            const amountItems = `${Object.values(dataObject).map((el, i) => `$${i + 1}`)}`;
                            const sql = `INSERT INTO ${nameDb} (${keys}) VALUES(${amountItems});`;
                            const values = Object.values(dataObject);
                            console.log({ sql, values });
                            yield pool.query(sql, values);
                            //  return true;
                        }
                        catch (e) {
                            console.error("Error adding document: ", e);
                            return false;
                        }
                    }
                    currentData = {};
                }
                return {
                    info: {
                        message: 'ok, data add into db',
                        status: true
                    }
                };
            }
            catch (error) {
                throw error;
            } // 
        });
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield pool.query('SELECT * from diucha;');
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteData() {
    }
    putData() {
    }
}
exports.queryDataBasePostgress = queryDataBasePostgress;
//# sourceMappingURL=modelsPostgress.js.map
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
    setData(data, nameTableDb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let initDataObject = {
                    name: '',
                    full_age: '',
                    otd: '',
                    code_article: '',
                    period_punish: '',
                    isguard: '',
                };
                let dataObject = {};
                const checkEntrySql = `SELECT * FROM ${nameTableDb};`;
                const listCurrentEntry = (yield pool.query(checkEntrySql)).rows;
                // console.log({listCurrentEntry: listCurrentEntry})
                let countWrite = 0;
                let countUpdateWrite = 0;
                let errorWar = [];
                for (let i = 4; i < 9999; i++) {
                    let notEntryIntoDb = true;
                    dataObject = initDataObject;
                    for (let key of Object.keys(data)) {
                        if (data['E' + i] === undefined)
                            break;
                        if (key === '!margins' || key === '!autofilter') { }
                        else {
                            if (key.includes(i)) {
                                `//  П.І.Б. "name": "Єгоров Андрій Олексійович",`;
                                if ('E' + i === key) {
                                    let full_name = data[key]['v'].trim().replace('  ', ' ').replace('`', '\'').replace("'", '\'');
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
                                //  Статус                              
                                if ('CP' + i === key) {
                                    dataObject = Object.assign(Object.assign({}, dataObject), { isguard: data[key]['v'] });
                                }
                            }
                        }
                    }
                    if (dataObject === null || dataObject === void 0 ? void 0 : dataObject.name) {
                        try {
                            //  заносим данные в бд
                            /**
                             * check the entry data into db'
                             * if true => change via popup
                             * else add new row
                             *
                             */
                            console.log('date 1 = ', dataObject.name);
                            for (let curEntry of listCurrentEntry) {
                                if (curEntry.name === dataObject.name && new Date(curEntry.full_age).toISOString() === dataObject.full_age.toISOString()) {
                                    notEntryIntoDb = false;
                                    // console.log('date_3 = ', curEntry.name === dataObject.name)
                                    // console.log('date_4 = ', new Date(curEntry.full_age).toISOString() === dataObject.full_age.toISOString())
                                    const setKeys = (0, helper_1.getKeysUpdateFromDb)(dataObject);
                                    const changeDataDbSql = `UPDATE ${nameTableDb} SET ${setKeys} WHERE name = '${dataObject.name.replace('\'', '\'\'')}' AND full_age::date = '${(dataObject.full_age).toISOString()}'`;
                                    const values = (0, helper_1.getValuesDb)(dataObject);
                                    countUpdateWrite = countUpdateWrite + 1;
                                    console.log('date 2 = ', changeDataDbSql, values);
                                    try {
                                        yield pool.query(changeDataDbSql, values);
                                    }
                                    catch (error) {
                                        console.log(error);
                                        errorWar.push(error.message);
                                    }
                                }
                            }
                            if (notEntryIntoDb) {
                                const keys = (0, helper_1.getKeysFromDb)(dataObject);
                                const amountItems = (0, helper_1.getAmountItemsDb)(dataObject);
                                const values = (0, helper_1.getValuesDb)(dataObject);
                                const sqlAddRow = `INSERT INTO ${nameTableDb} (${keys}) VALUES(${amountItems});`;
                                // console.log({sqlAddRow, values})
                                countWrite = countWrite + 1;
                                yield pool.query(sqlAddRow, values);
                            }
                            //  return true; 
                        }
                        catch (e) {
                            console.error("Error adding document: ", e);
                            return {
                                info: {
                                    message: 'Error додавання до бади данних' + e.message,
                                    status: false
                                }
                            };
                        }
                    }
                }
                return {
                    info: {
                        message: `З вкладки ${nameTableDb} було додано ${countWrite}, оновлено ${countUpdateWrite} записiв, помилок ${errorWar.length}, ${errorWar}`,
                        status: true
                    }
                };
            }
            catch (error) {
                throw error;
            } // 
        });
    }
    setDataDb(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keys = Object.keys(data).join(',');
                const amountItems = `${Object.values(data).map((el, i) => `$${i + 1}`)}`;
                const sql = `INSERT INTO ${table} (${keys}) VALUES(${amountItems});`;
                const values = Object.values(data);
                yield pool.query(sql, values);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getData() {
        return __awaiter(this, arguments, void 0, function* (table = 'diucha', query = '*', where = '', order_by = '') {
            try {
                let sql = `SELECT ${query} from ${table}`;
                if (where) {
                    sql = sql + ` WHERE (${where})`;
                }
                if (order_by) {
                    sql = sql + ` ORDER BY (${order_by})`;
                }
                sql = sql + ';';
                console.log({ sql });
                const result = yield pool.query(sql);
                return result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteData() {
        // DELETE FROM table_name WHERE condition RETURNING (select_list | *)
    }
    putData(table_1) {
        return __awaiter(this, arguments, void 0, function* (table, where = '', data = '', returning = '') {
            try {
                let sql = `UPDATE ${table} SET ${data} WHERE ${where};`;
                if (returning) {
                    sql = `UPDATE ${table} SET ${data} WHERE ${where} RETURNING ${returning} ;`;
                }
                console.log({ sql });
                const result = yield pool.query(sql);
                return result === null || result === void 0 ? void 0 : result.rows;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.queryDataBasePostgress = queryDataBasePostgress;
//# sourceMappingURL=modelsPostgress.js.map
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
const pool = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    database: 'mybase',
    user: 'admin',
    password: '11111111',
});
class queryDataBasePostgress {
    constructor() {
        this.client = pool.connect();
    }
    setData(data, nameDb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const keys = Object.keys(data).join(',');
                const amountItems = `${Object.values(data).map((el, i) => `$${i + 1}`)}`;
                const sql = `INSERT INTO ${nameDb} (${keys}) VALUES(${amountItems});`;
                const values = Object.values(data);
                yield pool.query(sql, values);
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
    getData(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nameField = 'name', qOperant = '!=', value = false }) {
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
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
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const config_1 = require("src/config/config");
const fbApp = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(config_1.config.get('serviceAccount'))
});
const db = (0, firestore_1.getFirestore)(fbApp);
class queryDataBase {
    setData(data, nameDb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db
                    .collection(nameDb)
                    .doc(data.name)
                    .set(Object.assign(Object.assign({}, data), { dateCreate: firestore_1.Timestamp.fromDate(new Date()), dateUpdate: null }));
            }
            catch (error) {
                throw error;
            }
        });
    }
    getDataFromDb(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nameField = 'name', qOperant = '!=', value = false }) {
            try {
                let results = [];
                const dbConnect = db.collection('mybase');
                // console.log(dbConnect)
                const listData = yield dbConnect.where(nameField, qOperant, value).get();
                if (listData.empty) {
                    return {
                        message: 'Data not find.',
                    };
                }
                listData.forEach(doc => {
                    // console.log(doc.id, '=>', doc.data());
                    let obj = {};
                    obj = doc.data();
                    results.push(obj);
                });
                return results;
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
exports.default = queryDataBase;
//# sourceMappingURL=models.js.map
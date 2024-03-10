"use strict";
// const {initializeApp} = require('firebase/app');
// const { getFirestore, collection, addDoc, getDoc, doc, namedQuery, refEqual } = require('firebase/firestore');
// converters are used with `setDoc`, `addDoc`, and `getDoc`
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
exports.queryDataBase = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const path_1 = require("path");
const certData = (0, path_1.join)(__dirname, '../', 'config/', 't-b-kik-80-firebase-adminsdk-9tb50-407289ee90.json');
const fbApp = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)(certData)
});
const db = (0, firestore_1.getFirestore)(fbApp);
class queryDataBase {
    // async setData(data, nameDb):void{
    //   try {
    //     await db
    //           .collection(nameDb)
    //           .doc(data.name)
    //           .set({
    //             ...data,
    //             dateCreate: Timestamp.fromDate(new Date()),
    //             dateUpdate: null,
    //           });
    //   } catch (error) {
    //     throw error;
    //   }
    // }
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
                    results.push(doc.data());
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
exports.queryDataBase = queryDataBase;
//# sourceMappingURL=models.js.map
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
const fbApp = (0, app_1.initializeApp)({
    credential: (0, app_1.cert)({
        "type": "service_account",
        "project_id": "t-b-kik-80",
        "private_key_id": "407289ee902d5c56a1787a18a4621109d3d3198d",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDc4SBJfvJUt0iW\nhC6K8QU/6DNEZ+dWC87Fyo3pV2V96F7kBZ9E2OcEuP4yru3ekTchUUS3JBNG5h2V\n6GRnLUNFKQ1gKPNmJWNeTkJGn7FZ/BXK/YAyjTI6dXrbWkYFf0TqMWWmf42LncLd\nYC/+2hNZiJbWjrnf+4aGA/pUOLCSKMPdPQy4oI3Ej/2nNtevbVQgxSopX2DYqd76\nayD6uKI73GZ3JOR9KnpRW7EFNfQNtnRu6h+PVoIX+K8eIXs+1Znmka7ok2QRq3G0\nisJ2ChMQSz2WhULs5cip1W4utzgnEOvZgN2004IIiJTuvqwA1uvaU9DXYdZHrURL\n302Pv63hAgMBAAECggEAEuIJK1dXur/XjAydWQH9Z6b/eQXj/FJymSy1oKD424B5\n2kcTxGRBrcDt9GHJkqk5/BZxSDHklv9VwKrXKI3xThCSJOojUtR38AhDOLvuwslf\nCJVO+CNji6Ve/TE0wsQMXXQfI1KMxIaWcewG9mPo2xLnCE033Urox3zAEiKtj7UV\nP+KAbXb7vm/pLDR/kg35Pvp8NxcHafevkVed/FJ9lTLF2+9162v/YuHvEKch2sY1\n9+cbz/016dEZmj8Dxw7X55MMC7+UBlLUMaHf9a3aG3+/gCYSwSYU+PL7qzR38d/x\nlrEqfDmcbV0ojPNYpKNBQgNNoVEEFVPYFK3D/uBNpQKBgQD6+Orrej/ozyMYE8TU\nziouc/LSAlPkZu3CQYz17iYYaYjtdS5Rd4fppDHAMELjAAn4Q2J4AMX2U0ddHGXu\n86GtkfTvOYf+JqgL26CfqpZ6etWlE1MtgZDNLty2SPBtrRHS+MC4VnNsV3mVOHzP\n0nAKu76259RkN1epqafqvKD7jQKBgQDhTeFe9qU34mwDHzKONv1W0aCWp9DxeQG1\n7+JBB5fU34yM9D2zRj9AUkSje6Ws+ypjprM/Am07Cn9ts/uJ0rU4rIaPVAslUHHG\n8bvJ6++Fpr+4KKdj9v8fL+bhuEi1dyhBevjF3cKCaqHSdeqbcrRU8o432NZFgo5P\n0tnV3sq8pQKBgQCh0IIvB2hTY9JdwMlE6BRcVRf3fda3SgH8IKWRH1ZioRDPAaG2\nlxoDc4E8SCGoGKtU7aV8eAsrUfCOQTQbx+uzbIr+/xoGrMfmtVmv+J4DJFXBlF8p\n1QMWuCNISGj0XgVDAG3JrLvI2/GhW4VlvWnOEdTaO0k+wEv+MUv51lr5NQKBgQCp\n1AKlilVPoqS4VbPN7zVXU/wwk56z5fqcIY3yZr7T/w360cAQeksDOP/0GyfvFAQH\nyYgjXrjnYCpdjuV0Jhfj+GgVccxU/CZHR7+9nNKXc/Hf5wUGHRCBeaIXUsm7v23g\nrckHnPkZRTdlZOzK79NulMcO4aviCV8sXEtHIwC+4QKBgQDUR7x7JigyhvrsU9y1\nL+fqysYNEcaZeXPPaKOAIPdYCBLOnAFlkLlFh7d/WBcqbVmTj2lYMsPxpSJbZ6+c\nq4ZyF6yPBFIeQv0XD4+OHKAzjQbuiGWUBclWHAKhxaDDvoVCBBINhzZivT6nb8ea\n5EmhIbAeoqaTd+IuourQZlVdQw==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-9tb50@t-b-kik-80.iam.gserviceaccount.com",
        "client_id": "102326903510922639303",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9tb50%40t-b-kik-80.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    })
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
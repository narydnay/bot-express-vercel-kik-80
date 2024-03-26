"use strict";
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
// const __dirname = dirname(fileURLToPath(import.meta.url));
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
exports.changeDataDbUser = exports.addNameToDb = exports.checkUserDb = exports.matchNames = exports.matchNamesSpecifics = exports.regExpName = void 0;
// export const sendPhoto = async (ctx, sendlerId, urlPhoto) => {
//   try {   
//     console.log({namePhotoCard: path.join(__dirname, '../../../')})
//     console.log({actionButton: urlPhoto})
//     // const namePhotoCard = actionButton + '.jpg'
//     // ctx.replyWithPhoto({ source: path.join(__dirname, '../../../', 'public/','images/',namePhotoCard)});//namePhotoCard))
//     // ctx.reply(namePhotoCard)
//   } catch (error) {
//     ctx.reply('з технічних причин фоното не було знайдено')
//   }
// }
function regExpName(name) {
    let newName = name.replace(/[аяоуюеєиії]/g, '.').replace('?', '');
    return newName;
}
exports.regExpName = regExpName;
function matchNamesSpecifics(name, key, listNames) {
    let resQueryName = listNames.filter(el => {
        let newName = name.toLowerCase().trim();
        if (newName.length > 2) {
            newName = regExpName(newName);
        }
        if (new RegExp(newName).test(el[key].toLowerCase().trim())) {
            return el;
        }
    });
    return resQueryName;
}
exports.matchNamesSpecifics = matchNamesSpecifics;
function matchNames(name, key, listNames) {
    let resQueryName = listNames.filter(el => {
        let newName = name.toLowerCase().trim();
        if (new RegExp(newName).test(el[key].toLowerCase().trim())) {
            return el;
        }
    });
    return resQueryName;
}
exports.matchNames = matchNames;
function checkUserDb(id, first_name, last_name, surname, username, db) {
    return __awaiter(this, void 0, void 0, function* () {
        let status = false;
        let res = null;
        res = yield db.getData('users', '*', `id_telegram = ${id}`);
        // console.log({res})
        if (res.length) {
            status = true;
        }
        else {
            addNameToDb('', id, first_name, last_name, surname, username, db);
        }
        return {
            info: {
                status,
                message: 'checkUserDb'
            },
            count: res.length,
            results: res,
        };
    });
}
exports.checkUserDb = checkUserDb;
function addNameToDb(name, id, first_name, last_name, surname, username, db) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let obj = {
                id_telegram: id,
                first_name: first_name,
                last_name: last_name,
                surname: surname,
                username: username,
                date_create: new Date(),
            };
            if (name)
                obj = Object.assign(Object.assign({}, obj), { custom_name: name });
            const res = yield db.setDataDb('users', obj);
        }
        catch (error) {
        }
    });
}
exports.addNameToDb = addNameToDb;
function changeDataDbUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ custom_name, id_telegram, db }) {
        try { // putData(table, where, data)
            console.log({ custom_name, id_telegram });
            const res = yield db.putData('users', `id_telegram = ${id_telegram}`, `custom_name = '` + custom_name + `', is_active = true`);
            //custom_name = 'test', is_active = true
            return res;
        }
        catch (error) {
            console.log({ error });
            throw error;
        }
    });
}
exports.changeDataDbUser = changeDataDbUser;
//# sourceMappingURL=utils-tg.js.map
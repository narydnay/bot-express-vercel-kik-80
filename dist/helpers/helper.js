"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeysUpdateFromDb = exports.getValuesDb = exports.getAmountItemsDb = exports.getKeysFromDb = exports.ExcelDateToJSDate = exports.showButtonsPagination = void 0;
const showButtonsPagination = (ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage) => {
    let pagination = [];
    if (+page === +allPaginationPage && allPaginationPage >= 2) {
        pagination = [
            { text: 'з початоку', callback_data: 'next' }
        ];
    }
    else if (allPaginationPage >= 2) {
        pagination = [
            // {text: 'пред',callback_data: 'back'},
            { text: 'наступна', callback_data: 'next' }
        ];
    }
    return ctx.reply(resultListPrisoner.length ? `Перелiк запиту сторiнка ${page} iз ${allPaginationPage}` : `Знайдено 0 карток`, {
        reply_markup: {
            inline_keyboard: [
                ...resultListPrisoner.slice(from_current_pagination, to_current_pagination),
                pagination,
            ]
        }
    });
};
exports.showButtonsPagination = showButtonsPagination;
function ExcelDateToJSDate(date) {
    const res = new Date(Math.round((date - 25569) * 86400 * 1000));
    if (Object.prototype.toString.call(res) === "[object Date]") {
        // it is a date
        if (isNaN(res)) { // d.getTime() or d.valueOf() will also work
            // date object is not valid
            return 'Invalid Date';
        }
        else {
            // date object is valid
            return res;
        }
    }
    else {
        return 'Invalid Date';
        // not a date object
    }
}
exports.ExcelDateToJSDate = ExcelDateToJSDate;
function getKeysFromDb(data) {
    return Object.keys(data).join(',');
}
exports.getKeysFromDb = getKeysFromDb;
function getAmountItemsDb(data) {
    return `${Object.values(data).map((el, i) => `$${i + 1}`)}`;
}
exports.getAmountItemsDb = getAmountItemsDb;
function getValuesDb(data) {
    return Object.values(data).map((el) => {
        if (typeof el === 'string') {
            return el;
        }
        return el;
    });
}
exports.getValuesDb = getValuesDb;
function getKeysUpdateFromDb(data) {
    //` name = ($1), full_age = ${dataObject.full_age}, otd = ${dataObject.otd}, code_article = ${dataObject.code_article}, period_punish = ${dataObject.period_punish}, image_url = ${dataObject.image_url}, isguard = ${dataObject.isguard}, `
    return Object.keys(data).map((el, i) => el + ` = $${i + 1}`).join(',');
}
exports.getKeysUpdateFromDb = getKeysUpdateFromDb;
//# sourceMappingURL=helper.js.map
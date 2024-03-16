"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelDateToJSDate = exports.showButtonsPagination = void 0;
const showButtonsPagination = (ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage) => {
    let pagination = [];
    if (+page === +allPaginationPage && allPaginationPage >= 2) {
        pagination = [
            { text: 'в начало', callback_data: 'next' }
        ];
    }
    else if (allPaginationPage >= 2) {
        pagination = [
            // {text: 'пред',callback_data: 'back'},
            { text: 'след', callback_data: 'next' }
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
//# sourceMappingURL=helper.js.map
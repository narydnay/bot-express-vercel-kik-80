"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showButtonsPagination = void 0;
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
//# sourceMappingURL=helper.js.map
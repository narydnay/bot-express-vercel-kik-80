
export const showButtonsPagination = (ctx: any, resultListPrisoner:[], page:number, from_current_pagination:number, to_current_pagination:number, allPaginationPage: number) => {
  let pagination: any = [];
  if(+page === +allPaginationPage && allPaginationPage >= 2){
    pagination = [
    {text: 'в начало', callback_data: 'next'}]
  } else if(allPaginationPage >= 2) {
    pagination = [
    // {text: 'пред',callback_data: 'back'},
    {text: 'след', callback_data: 'next'}
  ];
}
  return ctx.reply(resultListPrisoner.length?`Перелiк запиту сторiнка ${page} iз ${allPaginationPage}`: `Знайдено 0 карток`, {
    reply_markup: {      
  inline_keyboard: [
        ...resultListPrisoner.slice(from_current_pagination,to_current_pagination),
        pagination,
      ]
    }
  })
}

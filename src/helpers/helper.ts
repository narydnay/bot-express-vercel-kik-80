
export const showButtonsPagination = (ctx: any, resultListPrisoner:[], page:number, from_current_pagination:number, to_current_pagination:number, allPaginationPage: number) => {
  let pagination: any = [];
  if(+page === +allPaginationPage && allPaginationPage >= 2){
    pagination = [
    {text: 'з початоку', callback_data: 'next'}]
  } else if(allPaginationPage >= 2) {
    pagination = [
    // {text: 'пред',callback_data: 'back'},
    {text: 'наступна', callback_data: 'next'}
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

export function ExcelDateToJSDate(date:any) {
    const res: any = new Date(Math.round((date - 25569)*86400*1000));
    if (Object.prototype.toString.call(res) === "[object Date]") {
      // it is a date
      if (isNaN(res)) { // d.getTime() or d.valueOf() will also work
        // date object is not valid
        return 'Invalid Date'
      } else {
        // date object is valid
        return res
      }
    } else {
      return 'Invalid Date'
      // not a date object
    }
}
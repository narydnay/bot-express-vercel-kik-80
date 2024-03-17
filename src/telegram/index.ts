import { Telegraf } from "telegraf";
import {queryDataBasePostgress} from "../models/modelsPostgress";
import { showButtonsPagination } from "../helpers/helper";
import { getApp, initializeApp } from "firebase/app";
import { matchNames, matchNamesSpecifics } from "./utils-tg";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyDArYuP8lbb94JbErr6Y3xKwQS2oPE_zTc",
  authDomain: "t-b-kik-80.firebaseapp.com",
  projectId: "t-b-kik-80",
  storageBucket: "t-b-kik-80.appspot.com",
  messagingSenderId: "513130161339",
  appId: "1:513130161339:web:10285471a898b1a7f5759e",
  measurementId: "G-D1X8CLDW6X"
});
const firebaseApp = getApp();

const bot: any = new Telegraf('6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs');
const dbFirebase = new queryDataBasePostgress();
const default_pagination: number = 40;

let resultListPrisoner: [];
let fullListPrisoners: any;
let allPaginationPage: number = 0;
let page: number = 1;
let to_current_pagination: number = default_pagination;
let from_current_pagination: number = 0;

bot.start((ctx: any) => {
  console.log({ ctx: 'start observer' })
  const options: {} = {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Як користуватися',
          },
          {
            text: 'Страйовка',
            callback_data: "stroyvka"
          },
          {
            text: '❌ Сховати меню',
            selective: false
          },
        ],
        [
          {
            text: '1',
          },
          {
            text: '2',
          },
          {
            text: '3',
          },
          {
            text: '5',
          },
          {
            text: '6',
          },
        ],
        [
          {
            text: '7',
          },
          {
            text: '8',
          },
          {
            text: '9',
          },
          {
            text: '10',
          },
          {
            text: '11',
          },
        ],
        [
          {
            text: '12',
          },
          {
            text: '130',
          },
          {
            text: '131',
          },
          {
            text: '14',
          },
          {
            text: '15',
          },
        ],
        [
          {
            text: '16',
          },
          {
            text: '17',
          },
          {
            text: 'КДіР',
          },
          {
            text: 'ДСР',
          },
          {
            text: 'ДОВ',
            // request_poll: {type: 'regular'} //создание формы опроса или сам опрос

          },
        ],
      ],
      input_field_placeholder: 'напишіть команду або виберіть пункт у меню',
      is_persistent: false,
      one_time_keyboard: true,
      selective: false,// true - спрятана правая кнопка меню
      resize_keyboard: true,//маленький размер кнопок
      remove_keyboard: false
    }
  }
  ctx.reply("Багато цікавого у нижньому меню. 👇🏼", options)
  // ctx.ReplyKeyboardMarkup()
  return
})

bot.on('chat_shared', (ctx: any) => {
  console.log({ ctx })
})

bot.on('text', async (ctx: any) => {
  const { message } = ctx;  



  if (message.text.toUpperCase() === 'Як користуватися'.toUpperCase() || message.text.toUpperCase() === 'h'.toUpperCase()) {
    try {
      ctx.sendMessage('_Як користуватися_', {
        parse_mode: "MarkdownV2",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🔎 Пошук',
                callback_data: 'match_info'
              }
            ]
          ]
        }
      })

      return

    } catch (error) {
      return ctx.replyWithHTML(`<b>Cталася помилка, зробіть скрін і зв'яжіться з адміністратором</b>`);
    }
  } else if (message.text === '❌ Сховати меню') {
    return
  } else if(message.text.toUpperCase().includes('срок'.toUpperCase())){
    try {
      ctx.sendMessage('Получаем данные по ' + message.text);
      fullListPrisoners = await dbFirebase.getData()
      const value_find = message.text.replace('срок ','');
      console.log({value_find})
      const resultOtd = fullListPrisoners.filter((el: any) => el?.period_punish.includes(value_find));
      if (resultOtd.length > 0) {
        resultListPrisoner = resultOtd.map((el: any, i: number) => ([{
          text: i + 1 + ' - ' + el.name + ' - ' + el.otd,//el.full_age,
          callback_data: el.id
        }]));
        allPaginationPage = Math.ceil(resultOtd.length / default_pagination);
        from_current_pagination = 0;
        to_current_pagination = default_pagination;
        page = 1;
        return showButtonsPagination(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
      } else {
        return ctx.sendMessage('За вашим запитом ' + message.text + ' знайдено 0 карток')
      }

    } catch (error) {
      console.log(error)
      return ctx.sendMessage('За вашим запитом ' + message.text + ' знайдено 0 карток')
    }
  } else if (message.text === 'список') {
    try {
      ctx.sendMessage('Пошук...')
      fullListPrisoners = await dbFirebase.getData() //getDataFromDb({nameField: 'name', qOperant: '!=', value:false});
      allPaginationPage = Math.ceil(fullListPrisoners.length / default_pagination);
      from_current_pagination = 0;
      to_current_pagination = default_pagination;
      page = 1;
      resultListPrisoner = fullListPrisoners.map((el: any) => ([{
        text: el.name + 'вiдд. № ' + el.otd,
        callback_data: el.id
      }]));
      return showButtonsPagination(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);

    } catch (err) {
      console.log({ err })
      return ctx.sendMessage('ERROR? ...\n' + JSON.stringify(err, null, 4))
    }
  } else if (['1', '2', '3', '5', '6', '7', '8', '9', '10', '11', '12', '130', '131', '14', '15', '16', '17', 'КДіР', 'ДСР', 'ДОВ'].includes(message.text)) {
    fullListPrisoners = await dbFirebase.getData()
    try {
      ctx.sendMessage('Получаем данные по ' + message.text)
      const resultOtd = fullListPrisoners.filter((el: any) => el?.otd === message.text);
      if (resultOtd.length > 0) {
        resultListPrisoner = resultOtd.map((el: any, i: number) => ([{
          text: i + 1 + ' - ' + el.name + ' - ' + el.otd,//el.full_age,
          callback_data: el.id
        }]));
        allPaginationPage = Math.ceil(resultOtd.length / default_pagination);
        from_current_pagination = 0;
        to_current_pagination = default_pagination;
        page = 1;
        return showButtonsPagination(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
      } else {
        return ctx.sendMessage('За вашим запитом по дільниці ' + message.text + ' знайдено 0 карток')
      }

    } catch (error) {
      console.log(error)
      return ctx.sendMessage('За вашим запитом по дільниці ' + message.text + ' знайдено 0 карток')
    }
  } else {
    try {
      ctx.sendMessage('Пошук по _*' + message.text.toUpperCase() + '*_ ', { parse_mode: "MarkdownV2" })
      fullListPrisoners = await dbFirebase.getData() //getDataFromDb({nameField: 'name', qOperant: '!=', value:false});
      if (message.text.toUpperCase().includes('?')) {
        fullListPrisoners = matchNamesSpecifics(message.text, 'name', fullListPrisoners)
      } else {
        fullListPrisoners = matchNames(message.text, 'name', fullListPrisoners)
      }
      resultListPrisoner = fullListPrisoners.map((el: any) => ([{
        text: el.name + ' вiдд.№ ' + el.otd,
        callback_data: el.id
      }]));
      allPaginationPage = Math.ceil(fullListPrisoners.length / default_pagination);
      from_current_pagination = 0;
      to_current_pagination = default_pagination;
      page = 1;
      return showButtonsPagination(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
    } catch (error) {
      return ctx.sendMessage('За вашим запитом знайдено 0')
    }
  }
})



bot.on('callback_query', async (ctx: any) => {
  const name: any = ctx.update.callback_query
  try {
    if (name.data === 'match_info') {
      // await ctx.sendMessage(`*__страйовка__*     покажет актуальную страёвку`, { parse_mode: "MarkdownV2", });
      await ctx.sendMessage(`*__список__*        покажет весь список с пагинацией в лагере`, { parse_mode: "MarkdownV2", });
      await ctx.sendMessage(`*__16__*      выдаст списочный по отделению № 16`, { parse_mode: "MarkdownV2", });
      await ctx.sendMessage(`*__Iванов__*       будет искать по всем совподениям слов`, { parse_mode: "MarkdownV2", });
      await ctx.sendMessage(`*__Iванов?__*       со знаком ? будет искать по всем совподениям из согласных`, { parse_mode: "MarkdownV2", });

      // await ctx.sendMessage(`*__г 1984__*       ищет всех по году рождения`, { parse_mode: "MarkdownV2", });
      // await ctx.sendMessage(`*__д 27__*          ищет всех по дате рождения`, { parse_mode: "MarkdownV2", });
      // await ctx.sendMessage(`*__м 27__*          ищет всех по месецу рождения`, { parse_mode: "MarkdownV2", });
      // await ctx.sendMessage(`*__срок 5__*        ищет всех у кого срок 5 плюс лет`, { parse_mode: "MarkdownV2", });
      // await ctx.sendMessage('срок > 5 < 10 ищет всех у кого срок больше 5 и меньше 10');
      // await ctx.sendMessage(`*__стаття 115__* покажет всех у кого стаття 115`, { parse_mode: "MarkdownV2", });

      return
    }
    const allMembers = resultListPrisoner.length;
    if (name.data === 'back') {
      // пагинация в право
      console.log(page, ' === ', allPaginationPage)

      if (page === 1) {
        from_current_pagination = default_pagination * (allPaginationPage - page)
        to_current_pagination = allMembers;
        page = allPaginationPage;
      } else if (allPaginationPage - page === 0) {
        from_current_pagination = allMembers - default_pagination;;
        to_current_pagination = allMembers;
        page = page - 1;
      } else {

        console.log(default_pagination, ' * ', allPaginationPage, ' - ', page)
        //   15                      3            2
        let from = default_pagination * (allPaginationPage - page);
        // if(from_current_pagination === default_pagination) from = 0;
        from_current_pagination = from;
        to_current_pagination = allMembers - to_current_pagination;

        console.log({ from }, ' ===== ', { to_current_pagination })
        console.log(from_current_pagination, ' ===== ', to_current_pagination)
        page = page - 1;
        console.log(page, ' ==== ', allPaginationPage)
      }
      console.log({
        from_current_pagination,
        to_current_pagination,
        page,
      })
      return showButtonsPagination(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
    } else if (name.data === 'next') {
      if (page === allPaginationPage) {
        from_current_pagination = 0;
        to_current_pagination = default_pagination;
        page = 1;
      } else {
        let from = default_pagination;
        if (allMembers - to_current_pagination < default_pagination) from = allMembers - to_current_pagination;
        from_current_pagination = to_current_pagination
        to_current_pagination = to_current_pagination + from;
        page = page + 1;
      }
      console.log({
        from_current_pagination,
        to_current_pagination,
        page,
      })
      return showButtonsPagination(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
      // пагинация в лево
    } else if(name.data.includes('sub_photo_')){
      try {
        const idUsers = name.data.split('_').pop();
        if (fullListPrisoners.filter((el: any) => +el?.id === +idUsers).length > 0) {
          const fullName = fullListPrisoners.filter((el: any) => +el?.id === +idUsers)[0].name;
          const fullDate = fullListPrisoners.filter((el: any) => +el?.id === +idUsers)[0].full_age;
          const storage = getStorage(firebaseApp, "gs://t-b-kik-80.appspot.com");
          ///face_photo
          let spaceRefPhoto:any = '';
          let linkPhoto:any = '';
          try {
            spaceRefPhoto = ref(storage, `/face_photo/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}} f.jpg`);                        
            linkPhoto = await getDownloadURL(spaceRefPhoto)
          } catch (error) {
            spaceRefPhoto = ref(storage, `/face_photo/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}} f.JPG`);            
            linkPhoto = await getDownloadURL(spaceRefPhoto)
          }
          ctx.sendPhoto(linkPhoto);
        }        
      } catch (error) {
        ctx.sendMessage('За вашим запитом знайдено 0')
      }
    }else if(name.data === 'stroyvka' ){

    }else{
      try {
        // нужно показать карточку
        if (fullListPrisoners.filter((el: any) => +el?.id === +name.data).length > 0) {
          const fullName = fullListPrisoners.filter((el: any) => +el?.id === +name.data)[0].name;
          const fullDate = fullListPrisoners.filter((el: any) => +el?.id === +name.data)[0].full_age;
          const storage = getStorage(firebaseApp, "gs://t-b-kik-80.appspot.com");
          let spaceRef:any = '';
          let link:any = '';
          console.log({fullDate: new Date(fullDate).toLocaleDateString("tr-TR")})
          try {
            spaceRef = ref(storage, `/cards_prisoner/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}}.JPG`);            
            link = await getDownloadURL(spaceRef)
          } catch (error) {
            spaceRef = ref(storage, `/cards_prisoner/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}}.jpg`);                        
            link = await getDownloadURL(spaceRef)
          }
          ctx.sendPhoto(link, {
            reply_markup:{
              inline_keyboard: [
                [
                  {
                    text: 'получить фото',
                    callback_data: 'sub_photo_' + name.data
                  }
                ]
              ]
            }
          })
        }
      } catch (error) {
        ctx.sendMessage('За вашим запитом знайдено 0')

      }
    }
  } catch (error) {
    ctx.sendMessage('За вашим запитом знайдено 0')
  }

})
// ctx.reply('find ' + JSON.stringify('Найти не удалось', null, 4))     
export default bot;



//

//   "isGuard": true,




 


/**
 create table diucha(
id serial not null,
code_article text not null,
isGuard boolean,
full_age text not null,
image_url text not null,
period_punish text not null,
name text not null,
dateUpdate date,
dateCreate timestamp
 );
 */

// bot.launch({
//   webhook: {
//     domain: '17b1-89-209-84-19.ngrok-free.app',
//     hookPath: '/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc',
//   },
// });

 // const listPrisoner: any = await axios.get('https://bot-express-vercel-kik-80.vercel.app/api/test')
 // console.log({listPrisoner_1: listPrisoner.data})
 // console.log({listPrisoner_2: listPrisoner.data.listPrisoner.splice(0,2)}) // listPrisoner.splite(0,3)
 // return ctx.reply('Data from server? ...' + JSON.stringify({
 //   ...listPrisoner.data.message,
 //   results: listPrisoner.data.listPrisoner.splice(0,2)}, null, 4))
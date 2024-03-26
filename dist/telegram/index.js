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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const modelsPostgress_1 = require("../models/modelsPostgress");
const helper_1 = require("../helpers/helper");
const app_1 = require("firebase/app");
const utils_tg_1 = require("./utils-tg");
const storage_1 = require("firebase/storage");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file 
const app = (0, app_1.initializeApp)({
    apiKey: "AIzaSyDArYuP8lbb94JbErr6Y3xKwQS2oPE_zTc",
    authDomain: "t-b-kik-80.firebaseapp.com",
    projectId: "t-b-kik-80",
    storageBucket: "t-b-kik-80.appspot.com",
    messagingSenderId: "513130161339",
    appId: "1:513130161339:web:10285471a898b1a7f5759e",
    measurementId: "G-D1X8CLDW6X"
});
const firebaseApp = (0, app_1.getApp)();
const TOKEN = (process.env.TELEGRAM_TOKEN).toString();
const bot = new telegraf_1.Telegraf(TOKEN);
// const bot: any = new Telegraf('6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs');
const db = new modelsPostgress_1.queryDataBasePostgress();
const default_pagination = 40;
let resultListPrisoner;
let fullListPrisoners;
let allPaginationPage = 0;
let page = 1;
let to_current_pagination = default_pagination;
let from_current_pagination = 0;
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const id_User = ctx.update.message.chat.id;
    const first_name = ctx.update.message.chat.first_name;
    const last_name = ctx.update.message.chat.last_name;
    const surname = ctx.update.message.chat.surname;
    const username = ctx.update.message.chat.username;
    const resChecking = yield (0, utils_tg_1.checkUserDb)(id_User, first_name, last_name, surname, username, db);
    console.log({ ctx: 'start observer' });
    yield ctx.sendMessage(`Для того щоб скористатися сервісом необхідно зареєструватися`);
    yield ctx.sendMessage(`Введіть Ваше прізвище`);
    return;
}));
bot.on('chat_shared', (ctx) => {
    console.log({ ctx });
});
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = ctx;
    const id_User = ctx.update.message.chat.id;
    const first_name = ctx.update.message.chat.first_name;
    const last_name = ctx.update.message.chat.last_name;
    const surname = ctx.update.message.chat.surname;
    const username = ctx.update.message.chat.username;
    const resChecking = yield (0, utils_tg_1.checkUserDb)(id_User, first_name, last_name, surname, username, db);
    // console.log({resChecking})
    // console.log(resChecking.results[0]) 
    // Введіть Ваше прізвище
    if (!resChecking.info.status && !resChecking.count) {
        // need registration
        yield ctx.sendMessage(`Для того щоб скористатися сервісом необхідно зареєструватися`);
        yield ctx.sendMessage(`Введіть Ваше прізвище`);
        return;
    }
    else {
        if (resChecking.count && !resChecking.results[0].is_active && resChecking.results[0].is_blocked) {
            return ctx.sendMessage('Ви були заблоковані, щоб поновити роботу, зв\'яжіться з адміністратором https://t.me/narydnay_admin');
        }
        if (resChecking.count && !resChecking.results[0].is_active) { //
            // console.log(resChecking.results[0])
            if (message.text) {
                const options = {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'так',
                                    callback_data: 'registration_yes'
                                },
                                {
                                    text: 'ні',
                                    callback_data: 'registration_no'
                                },
                            ]
                        ],
                    },
                    parse_mode: "MarkdownV2",
                };
                return yield ctx.sendMessage('ім\'я для реєстрації\\. __*' + message.text + '*__', options);
            }
            // await ctx.sendMessage(`Для того щоб скористатися сервісом необхідно зареєструватися` );
            const options = {};
            yield ctx.reply(`Знову раді вас бачити, але ви досі не реєструвалися, зайдіть в меню і виберіть пункт "Реєстрація"`, options);
            // await ctx.sendMessage();      
            return;
        }
    }
    if (message.text === 'a') {
        // console.log({ ctx: ctx.update })
        // console.log({ ctx: ctx.update.message.chat })    
        ctx.sendMessage('hi bro ' + id_User);
    }
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
            });
            return;
        }
        catch (error) {
            return ctx.replyWithHTML(`<b>Cталася помилка, зробіть скрін і зв'яжіться з адміністратором</b>`);
        }
    }
    else if (message.text === '❌ Сховати меню') {
        return;
    }
    else if (message.text.toUpperCase().includes('срок'.toUpperCase())) {
        try {
            ctx.sendMessage('Получаем данные по ' + message.text);
            fullListPrisoners = yield db.getData();
            const value_find = message.text.replace('срок ', '');
            console.log({ value_find });
            const resultOtd = fullListPrisoners.filter((el) => el === null || el === void 0 ? void 0 : el.period_punish.includes(value_find));
            if (resultOtd.length > 0) {
                resultListPrisoner = resultOtd.map((el, i) => ([{
                        text: i + 1 + ' - ' + el.name + ' - ' + el.otd, //el.full_age,
                        callback_data: el.id
                    }]));
                allPaginationPage = Math.ceil(resultOtd.length / default_pagination);
                from_current_pagination = 0;
                to_current_pagination = default_pagination;
                page = 1;
                return (0, helper_1.showButtonsPagination)(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
            }
            else {
                return ctx.sendMessage('За вашим запитом ' + message.text + ' знайдено 0 карток');
            }
        }
        catch (error) {
            console.log(error);
            return ctx.sendMessage('За вашим запитом ' + message.text + ' знайдено 0 карток');
        }
    }
    else if (message.text === 'список') {
        try {
            ctx.sendMessage('Пошук...');
            fullListPrisoners = yield db.getData(); //getDataFromDb({nameField: 'name', qOperant: '!=', value:false});
            allPaginationPage = Math.ceil(fullListPrisoners.length / default_pagination);
            from_current_pagination = 0;
            to_current_pagination = default_pagination;
            page = 1;
            resultListPrisoner = fullListPrisoners.map((el) => ([{
                    text: el.name + 'вiдд. № ' + el.otd,
                    callback_data: el.id
                }]));
            return (0, helper_1.showButtonsPagination)(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
        }
        catch (err) {
            console.log({ err });
            return ctx.sendMessage('ERROR? ...\n' + JSON.stringify(err, null, 4));
        }
    }
    else if (['1', '2', '3', '5', '6', '7', '8', '9', '10', '11', '12', '130', '131', '14', '15', '16', '17', 'КДіР', 'ДСР', 'ДОВ'].includes(message.text)) {
        fullListPrisoners = yield db.getData();
        try {
            ctx.sendMessage('Получаем данные по ' + message.text);
            const resultOtd = fullListPrisoners.filter((el) => (el === null || el === void 0 ? void 0 : el.otd) === message.text);
            if (resultOtd.length > 0) {
                resultListPrisoner = resultOtd.map((el, i) => ([{
                        text: i + 1 + ' - ' + el.name + ' - ' + el.otd, //el.full_age,
                        callback_data: el.id
                    }]));
                allPaginationPage = Math.ceil(resultOtd.length / default_pagination);
                from_current_pagination = 0;
                to_current_pagination = default_pagination;
                page = 1;
                return (0, helper_1.showButtonsPagination)(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
            }
            else {
                return ctx.sendMessage('За вашим запитом по дільниці ' + message.text + ' знайдено 0 карток');
            }
        }
        catch (error) {
            console.log(error);
            return ctx.sendMessage('За вашим запитом по дільниці ' + message.text + ' знайдено 0 карток');
        }
    }
    else {
        try {
            ctx.sendMessage('Пошук по _*' + message.text.toUpperCase() + '*_ ', { parse_mode: "MarkdownV2" });
            fullListPrisoners = yield db.getData(); //getDataFromDb({nameField: 'name', qOperant: '!=', value:false});
            if (message.text.toUpperCase().includes('?')) {
                fullListPrisoners = (0, utils_tg_1.matchNamesSpecifics)(message.text, 'name', fullListPrisoners);
            }
            else {
                fullListPrisoners = (0, utils_tg_1.matchNames)(message.text, 'name', fullListPrisoners);
            }
            resultListPrisoner = fullListPrisoners.map((el) => ([{
                    text: el.name + ' вiдд.№ ' + el.otd,
                    callback_data: el.id
                }]));
            allPaginationPage = Math.ceil(fullListPrisoners.length / default_pagination);
            from_current_pagination = 0;
            to_current_pagination = default_pagination;
            page = 1;
            return (0, helper_1.showButtonsPagination)(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
        }
        catch (error) {
            return ctx.sendMessage('За вашим запитом знайдено 0');
        }
    }
}));
bot.on('callback_query', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const name = ctx.update.callback_query;
    try {
        if (name.data === 'registration_yes') {
            const nameUserReg = ctx.update.callback_query.message.text.split('. ').pop();
            const id = ctx.update.callback_query.from.id;
            const res = yield (0, utils_tg_1.changeDataDbUser)({ custom_name: nameUserReg, id_telegram: id, db });
            yield ctx.sendMessage(`Ласкаво просимо до нашої системи ${nameUserReg}.\n Зробіть запит.`);
            return;
        }
        if (name.data === 'registration_no') {
            yield ctx.sendMessage(`Введіть Ваше прізвище`);
            return;
        }
        if (name.data === 'match_info') {
            // await ctx.sendMessage(`*__страйовка__*     покажет актуальную страёвку`, { parse_mode: "MarkdownV2", });
            yield ctx.sendMessage(`*__список__*        покажет весь список с пагинацией в лагере`, { parse_mode: "MarkdownV2", });
            yield ctx.sendMessage(`*__16__*      выдаст списочный по отделению № 16`, { parse_mode: "MarkdownV2", });
            yield ctx.sendMessage(`*__Iванов__*       будет искать по всем совподениям слов`, { parse_mode: "MarkdownV2", });
            yield ctx.sendMessage(`*__Iванов?__*       со знаком ? будет искать по всем совподениям из согласных`, { parse_mode: "MarkdownV2", });
            // await ctx.sendMessage(`*__г 1984__*       ищет всех по году рождения`, { parse_mode: "MarkdownV2", });
            // await ctx.sendMessage(`*__д 27__*          ищет всех по дате рождения`, { parse_mode: "MarkdownV2", });
            // await ctx.sendMessage(`*__м 27__*          ищет всех по месецу рождения`, { parse_mode: "MarkdownV2", });
            // await ctx.sendMessage(`*__срок 5__*        ищет всех у кого срок 5 плюс лет`, { parse_mode: "MarkdownV2", });
            // await ctx.sendMessage('срок > 5 < 10 ищет всех у кого срок больше 5 и меньше 10');
            // await ctx.sendMessage(`*__стаття 115__* покажет всех у кого стаття 115`, { parse_mode: "MarkdownV2", });
            return;
        }
        const allMembers = resultListPrisoner.length;
        if (name.data === 'back') {
            // пагинация в право
            console.log(page, ' === ', allPaginationPage);
            if (page === 1) {
                from_current_pagination = default_pagination * (allPaginationPage - page);
                to_current_pagination = allMembers;
                page = allPaginationPage;
            }
            else if (allPaginationPage - page === 0) {
                from_current_pagination = allMembers - default_pagination;
                ;
                to_current_pagination = allMembers;
                page = page - 1;
            }
            else {
                console.log(default_pagination, ' * ', allPaginationPage, ' - ', page);
                //   15                      3            2
                let from = default_pagination * (allPaginationPage - page);
                // if(from_current_pagination === default_pagination) from = 0;
                from_current_pagination = from;
                to_current_pagination = allMembers - to_current_pagination;
                console.log({ from }, ' ===== ', { to_current_pagination });
                console.log(from_current_pagination, ' ===== ', to_current_pagination);
                page = page - 1;
                console.log(page, ' ==== ', allPaginationPage);
            }
            console.log({
                from_current_pagination,
                to_current_pagination,
                page,
            });
            return (0, helper_1.showButtonsPagination)(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
        }
        else if (name.data === 'next') {
            if (page === allPaginationPage) {
                from_current_pagination = 0;
                to_current_pagination = default_pagination;
                page = 1;
            }
            else {
                let from = default_pagination;
                if (allMembers - to_current_pagination < default_pagination)
                    from = allMembers - to_current_pagination;
                from_current_pagination = to_current_pagination;
                to_current_pagination = to_current_pagination + from;
                page = page + 1;
            }
            console.log({
                from_current_pagination,
                to_current_pagination,
                page,
            });
            return (0, helper_1.showButtonsPagination)(ctx, resultListPrisoner, page, from_current_pagination, to_current_pagination, allPaginationPage);
            // пагинация в лево
        }
        else if (name.data.includes('sub_photo_')) {
            try {
                const idUsers = name.data.split('_').pop();
                if (fullListPrisoners.filter((el) => +(el === null || el === void 0 ? void 0 : el.id) === +idUsers).length > 0) {
                    const fullName = fullListPrisoners.filter((el) => +(el === null || el === void 0 ? void 0 : el.id) === +idUsers)[0].name;
                    const fullDate = fullListPrisoners.filter((el) => +(el === null || el === void 0 ? void 0 : el.id) === +idUsers)[0].full_age;
                    const storage = (0, storage_1.getStorage)(firebaseApp, "gs://t-b-kik-80.appspot.com");
                    ///face_photo
                    let spaceRefPhoto = '';
                    let linkPhoto = '';
                    try {
                        spaceRefPhoto = (0, storage_1.ref)(storage, `/face_photo/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}} f.jpg`);
                        linkPhoto = yield (0, storage_1.getDownloadURL)(spaceRefPhoto);
                    }
                    catch (error) {
                        spaceRefPhoto = (0, storage_1.ref)(storage, `/face_photo/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}} f.JPG`);
                        linkPhoto = yield (0, storage_1.getDownloadURL)(spaceRefPhoto);
                    }
                    ctx.sendPhoto(linkPhoto);
                }
            }
            catch (error) {
                ctx.sendMessage('За вашим запитом знайдено 0');
            }
        }
        else if (name.data === 'stroyvka') {
        }
        else {
            try {
                // нужно показать карточку
                if (fullListPrisoners.filter((el) => +(el === null || el === void 0 ? void 0 : el.id) === +name.data).length > 0) {
                    const fullName = fullListPrisoners.filter((el) => +(el === null || el === void 0 ? void 0 : el.id) === +name.data)[0].name;
                    const fullDate = fullListPrisoners.filter((el) => +(el === null || el === void 0 ? void 0 : el.id) === +name.data)[0].full_age;
                    const storage = (0, storage_1.getStorage)(firebaseApp, "gs://t-b-kik-80.appspot.com");
                    let spaceRef = '';
                    let link = '';
                    console.log({ fullDate: new Date(fullDate).toLocaleDateString("tr-TR") });
                    try {
                        spaceRef = (0, storage_1.ref)(storage, `/cards_prisoner/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}}.JPG`);
                        link = yield (0, storage_1.getDownloadURL)(spaceRef);
                    }
                    catch (error) {
                        spaceRef = (0, storage_1.ref)(storage, `/cards_prisoner/${fullName} {${new Date(fullDate).toLocaleDateString("tr-TR")}}.jpg`);
                        link = yield (0, storage_1.getDownloadURL)(spaceRef);
                    }
                    ctx.sendPhoto(link, {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: 'получить фото',
                                        callback_data: 'sub_photo_' + name.data
                                    }
                                ]
                            ]
                        }
                    });
                }
            }
            catch (error) {
                ctx.sendMessage('За вашим запитом знайдено 0');
            }
        }
    }
    catch (error) {
        ctx.sendMessage('За вашим запитом знайдено 0' + error.message);
    }
}));
bot.launch(() => console.log('Start new bot'));
// ctx.reply('find ' + JSON.stringify('Найти не удалось', null, 4))     
exports.default = bot;
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
//# sourceMappingURL=index.js.map
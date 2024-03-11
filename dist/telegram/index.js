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
const models_1 = __importDefault(require("../models/models"));
const bot = new telegraf_1.Telegraf('6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc');
const dbFirebase = new models_1.default();
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = ctx;
    if (message.text === 'список') {
        try {
            // const listPrisoner = await axios.get('https://t-bot-kik.vercel.app/get-all-prisoners')
            const listPrisoner = yield dbFirebase.getDataFromDb({ nameField: 'name', qOperant: '!=', value: false });
            return ctx.reply('hi bro we work good, what are doing? ...' + JSON.stringify(listPrisoner.splite(0, 3), null, 4));
        }
        catch (err) {
            return ctx.reply('ERROR? ...\n' + JSON.stringify(err, null, 4));
        }
    }
    ctx.reply('hi bro we work good, what are doing? ...' + JSON.stringify(message, null, 4));
}));
exports.default = bot;
//# sourceMappingURL=index.js.map
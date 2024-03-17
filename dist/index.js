"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = require("./routers/router");
const telegram_1 = __importDefault(require("./telegram"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const host = 'https://ddfc-89-209-185-240.ngrok-free.app';
const headers = {
    'X-Telegram-Bot-Api-Secret-Token': '6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs'
};
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
telegram_1.default.telegram.setWebhook('https://bot-express-vercel-kik-80.vercel.app/secret-code/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs', {
    certificate: './telegram/cert/crt.pem', // Path to your crt.pem
});
app.use(telegram_1.default.webhookCallback('secret-code/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs'));
// bot.telegram.setWebhook('https://ddfc-89-209-185-240.ngrok-free.app/secret-code/6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs')
app.use('/api', router_1.route);
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
//   bot.launch({
//   webhook: {
//     domain: 'bot-express-vercel-kik-80.vercel.app',
//     hookPath: '/secret-code/6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs',
//     port:3000
//   },
// },
// ()=>console.log('Start bot'),
// );
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
process.once('SIGINT', () => telegram_1.default.stop('SIGINT'));
process.once('SIGTERM', () => telegram_1.default.stop('SIGTERM'));
// https://api.telegram.org/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs/setWebhook?url=https://bot-express-vercel-kik-80.vercel.app/secret-code/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs
// https://api.telegram.org/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs/getWebhookInfo
//# sourceMappingURL=index.js.map
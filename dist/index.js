"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./routers/router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file 
const app = (0, express_1.default)();
const port = process.env.PORT || 7000;
const host = process.env ? 'https://ddfc-89-209-185-240.ngrok-free.app' : '';
const headers = {
    'X-Telegram-Bot-Api-Secret-Token': '6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs'
};
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,PATCH,OPTIONS`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
app.use((0, cors_1.default)({ credentials: true, origin: 'https://narydnay-admin.vercel.app' }));
app.options('*', (0, cors_1.default)());
app.use(allowCrossDomain);
app.use(body_parser_1.default.json());
// app.use(bodyParser.urlencoded());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(formdata.parse())
app.use(express_1.default.static("public"));
console.log(process.env.DEV);
const setWebHookToken = `https://bot-express-vercel-kik-80.vercel.app/secret-code/bot${process.env.TELEGRAM_TOKEN}`;
const webhookCallbackToken = `secret-code/bot${process.env.TELEGRAM_TOKEN}`;
// if(process?.env?.DEV !== 'developer'){
//   console.log('token telegram connect')
//   bot.telegram.setWebhook(setWebHookToken,{
//     // certificate: './telegram/cert/crt.pem', // Path to your crt.pem
//   });
//   app.use(bot.webhookCallback(webhookCallbackToken));
// }
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
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
// https://api.telegram.org/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs/setWebhook?url=https://bot-express-vercel-kik-80.vercel.app/secret-code/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs
// https://api.telegram.org/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs/getWebhookInfo
//# sourceMappingURL=index.js.map
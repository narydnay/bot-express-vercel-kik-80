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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(telegram_1.default.webhookCallback('secret-code/6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg'));
// bot.telegram.setWebhook('https://ddfc-89-209-185-240.ngrok-free.app/secret-code/6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg')
telegram_1.default.telegram.setWebhook('https://bot-express-vercel-kik-80.vercel.app/secret-code/6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg');
app.use('/api', router_1.route);
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
telegram_1.default.launch(() => console.log('Start bot'));
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
//# sourceMappingURL=index.js.map
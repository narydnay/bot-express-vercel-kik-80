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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.use(telegram_1.default.webhookCallback('/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc'));
telegram_1.default.telegram.setWebhook('https://fbdd-193-200-13-42.ngrok-free.app/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc');
// bot.telegram.setWebhook('https://bot-express-vercel-kik-80.vercel.app/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc');
app.use('/api', router_1.route);
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map
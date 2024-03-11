import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import { route } from './routers/router'
import bot from './telegram';

  const app = express()
  const port = process.env.PORT || 8181

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static("public"));

  app.use(bot.webhookCallback('/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc'));
  bot.telegram.setWebhook('https://bot-express-vercel-kik-80.vercel.app/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc');

  app.use('/api',route)
  app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
  })

  app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
  })

  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })


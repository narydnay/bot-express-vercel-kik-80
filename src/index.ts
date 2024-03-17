import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import { route } from './routers/router'
import bot from './telegram';


  const app = express()
  const port = process.env.PORT || 3000
  const host= 'https://ddfc-89-209-185-240.ngrok-free.app'
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static("public"));

  app.use(bot.webhookCallback('secret-code/6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg'));
  
  // bot.telegram.setWebhook('https://ddfc-89-209-185-240.ngrok-free.app/secret-code/6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg')
  
  bot.telegram.setWebhook('https://bot-express-vercel-kik-80.vercel.app/secret-code/6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg');

  app.use('/api',route)
  app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel');
  })

  app.get('/ping', (_req: Request, res: Response) => {
    bot.launch(()=>console.log('Start bot'))
    return res.send('pong 🏓')
  })
  
  bot.launch(()=>console.log('Start bot'))
  // bot.launch({
//   webhook: {
//     domain: '17b1-89-209-84-19.ngrok-free.app',
//     hookPath: '/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc',
//   },
// },
// ()=>console.log('Start bot'),
// );
  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
  })

  // process.once('SIGINT', () => bot.stop('SIGINT'))
  // process.once('SIGTERM', () => bot.stop('SIGTERM'))
// https://api.telegram.org/bot6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg/setWebhook?url=https://bot-express-vercel-kik-80.vercel.app/secret-code/6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg

// https://api.telegram.org/bot6884974307:AAEXO7AVmAtsoB4QHXjYuLPKqpPzs__VeSg/getWebhookInfo
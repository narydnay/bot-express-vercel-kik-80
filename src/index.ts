import express, { NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { route } from './routers/router'
import dotenv from 'dotenv'; 
import formdata from 'express-form-data';
import bot from './telegram';


  dotenv.config();  // Load environment variables from .env file 
  const app = express()
  const port = process.env.PORT || 7000

  const host= process.env ? 'https://ddfc-89-209-185-240.ngrok-free.app' : '';
  const headers = {
    'X-Telegram-Bot-Api-Secret-Token': '6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs'
  }

  const allowCrossDomain = (req: Request, res: Response, next: NextFunction) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  };

  app.use(cors())
  app.options('*', cors());
  app.use(allowCrossDomain)
  app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded());
  app.use(bodyParser.urlencoded({extended: true}));
  // app.use(formdata.parse())
  app.use(express.static("public"));

  console.log(process.env.DEV)
  const setWebHookToken = `https://bot-express-vercel-kik-80.vercel.app/secret-code/bot${process.env.TELEGRAM_TOKEN}`;
  const webhookCallbackToken = `secret-code/bot${process.env.TELEGRAM_TOKEN}`
  
  if(process.env.DEV !== 'developer'){
    console.log('token telegram connect')
    bot.telegram.setWebhook(setWebHookToken,{
      // certificate: './telegram/cert/crt.pem', // Path to your crt.pem
    });
    app.use(bot.webhookCallback(webhookCallbackToken));
  }
  
 
  
  app.use('/api',route)
  app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel');
  })

  app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
  })

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
    return console.log(`Server is listening on ${port}`)
  });

  // process.once('SIGINT', () => bot.stop('SIGINT'))
  // process.once('SIGTERM', () => bot.stop('SIGTERM'))
// https://api.telegram.org/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs/setWebhook?url=https://bot-express-vercel-kik-80.vercel.app/secret-code/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs

// https://api.telegram.org/bot6884974307:AAEhqlrw82pHm1C-kPqUeKjPK_zOp92Rrrs/getWebhookInfo
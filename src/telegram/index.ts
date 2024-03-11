import { Telegraf } from "telegraf";
import queryDataBase from "../models/models";
import axios from "axios";


const options: object = {
  webHook: {
      port: 443
  }
};
const bot = new Telegraf('6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc', options);
const dbFirebase = new queryDataBase();

bot.on('text', async ctx => {
  const { message } = ctx;
  if(message.text === 'список' ){
    try{
      const listPrisoner: any = await axios.get('https://bot-express-vercel-kik-80.vercel.app/api/test')
      // const listPrisoner: any = await dbFirebase.getDataFromDb({nameField: 'name', qOperant: '!=', value:false});
      console.log({listPrisoner})
      return ctx.reply('hi bro we work good, what are doing? ...' + JSON.stringify(listPrisoner.splite(0,3), null, 4))
    }catch(err){
      return ctx.reply('ERROR? ...\n' + JSON.stringify(err, null, 4))
    }
  }
  ctx.reply('hi bro we work good, what are doing? ...' + JSON.stringify(message, null, 4))
})

// bot.launch({
//   webhook: {
//     domain: '17b1-89-209-84-19.ngrok-free.app',
//     hookPath: '/secret-code/6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc',
//   },
// });


export default bot;
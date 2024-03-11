import { Telegraf } from "telegraf";
import queryDataBase from "../models/models";
import axios from "axios";


const bot = new Telegraf('6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc');
const dbFirebase = new queryDataBase();

bot.on('text', async ctx => {
  const { message } = ctx;
  if(message.text === 'список' ){
    try{
      const listPrisoner: any = await axios.get('https://bot-express-vercel-kik-80.vercel.app/api/test')
      // const listPrisoner: any = await dbFirebase.getDataFromDb({nameField: 'name', qOperant: '!=', value:false});
      return ctx.reply('hi bro we work good, what are doing? ...' + JSON.stringify(listPrisoner.splite(0,3), null, 4))
    }catch(err){
      return ctx.reply('ERROR? ...\n' + JSON.stringify(err, null, 4))
    }
  }
  ctx.reply('hi bro we work good, what are doing? ...' + JSON.stringify(message, null, 4))
})



export default bot;
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';
// const __dirname = dirname(fileURLToPath(import.meta.url));

// export const sendPhoto = async (ctx, sendlerId, urlPhoto) => {
//   try {   
//     console.log({namePhotoCard: path.join(__dirname, '../../../')})
//     console.log({actionButton: urlPhoto})
//     // const namePhotoCard = actionButton + '.jpg'
//     // ctx.replyWithPhoto({ source: path.join(__dirname, '../../../', 'public/','images/',namePhotoCard)});//namePhotoCard))
//     // ctx.reply(namePhotoCard)
//   } catch (error) {
//     ctx.reply('з технічних причин фоното не було знайдено')
//   }
// }



export function regExpName(name) {
  let newName = name.replace(/[аяоуюеєиії]/g, '.').replace('?','');
  return newName;
}

export function matchNamesSpecifics (name, key, listNames) {
let resQueryName = listNames.filter( el => {
  let newName = name.toLowerCase().trim();
  if(newName.length>2){
    newName = regExpName(newName)
  }
    if(new RegExp(newName).test(el[key].toLowerCase().trim())){
      return el;
    }  
  });
  return resQueryName;
}
export function matchNames (name, key, listNames) {
let resQueryName = listNames.filter( el => {
  let newName = name.toLowerCase().trim();
    if(new RegExp(newName).test(el[key].toLowerCase().trim())){
      return el;
    }  
  });
  return resQueryName;
}
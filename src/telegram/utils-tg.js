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

export async function checkUserDb(
  id, 
  first_name, 
  last_name, 
  surname, 
  username, 
  db
){
  let status = false;
  let res = null;
  res = await db.getData('users', '*', `id_telegram = ${id}`)
  // console.log({res})
  if(res.length){
    status = true;
  }else{
    addNameToDb('', id, first_name, last_name, surname, username, db);
  }
  return {
    info: {
      status,
      message: 'checkUserDb'
    },
    count: res.length,
    results: res,
  }
}

export async function addNameToDb(name, id, first_name, last_name, surname, username, db) {
  try {    
    let obj = {
      id_telegram: id,
      first_name: first_name,
      last_name: last_name,
      surname: surname,
      username: username,
      date_create: new Date(),
    }
    if(name) obj = {...obj,custom_name: name}   
    const res = await db.setDataDb('users', obj);
  } catch (error) {
    
  }
}

export async function changeDataDbUser({custom_name, id_telegram, db}){
  try { // putData(table, where, data)
    console.log({custom_name, id_telegram})
    const res = await db.putData(
      'users', 
      `id_telegram = ${id_telegram}`,
      `custom_name = '` + custom_name + `', is_active = true`,  
      )
      //custom_name = 'test', is_active = true
    return res;
  } catch (error) {
    console.log({error})
    throw error;
  }
}
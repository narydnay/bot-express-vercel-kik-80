import { Pool } from 'pg';
import { ExcelDateToJSDate } from '../helpers/helper';

const pool = new Pool({
  host: '193.0.61.232',
  port: 6432,
  database: 'kik',
  user: 'admin',
  password: 'oSLxPwYigQkKZoNAacRRNTFX3HD69IO9SEFpJhE0wyzyhUAwDd',
})


class queryDataBasePostgress {
  client = pool.connect();
  async setData(data, nameDb){
    try {

      let initDataObject = {
        name: '',
        full_age: '',
        otd: '',
        code_article: '',
        period_punish: '',
      }
      let listData = [];
      let currentData = {}
      let dataObject = {};
      let resultSend = 'send'

      for (let i = 4; i < 9999; i++) {
        dataObject = initDataObject;
        for (let key of Object.keys(data)) {
          if(data['E'+i] === undefined) break;
          if(key === '!margins' || key === '!autofilter'){}else{
            if(key.includes(i)){
              `//  П.І.Б. "name": "Єгоров Андрій Олексійович",`
              if('E'+i === key){
                let full_name = data[key]['v'].trim().replace('  ', ' ')
                const pib = full_name.split(' ');
                dataObject = {
                  ...dataObject,
                  name: full_name,
                }
              }              
              //  Дата народження `"full_age": "04.09.1964",`
              if('F'+i === key){
                dataObject = {
                  ...dataObject,
                  full_age: ExcelDateToJSDate(data[key]['v'])
                }
              }              
              //  від `"otd": "16"`
              if('G'+i === key){
                dataObject = {
                  ...dataObject,
                  otd: data[key]['v']
                }
              }
             
              //  Статті КК України                           `"code_article": "307ч2, 72ч5",`
              if('L'+i === key){
                dataObject = {
                  ...dataObject,
                  code_article: data[key]['v']
                }
              }
              //  Строк покарання                             `"period_punish": "6р.п/в з конф.ос/м",`
              if('M'+i === key){
                dataObject = {
                  ...dataObject,
                  period_punish: data[key]['v']
                }
              }
              
            }
          }
        }
        if(dataObject?.name){
          try {
            //  заносим данные в бд
            let options = {
            };
            // console.log('date = ', dataObject)
            // console.log('date 1 = ', dataObject.full_age?.toLocaleDateString("tr-TR"))
            // console.log({dataObject})
          const subBase = dataObject?.name +' {' + dataObject?.full_age.toLocaleDateString("tr-TR", options) + '}'
          console.log(`${i-3}`,{subBase})
          const keys = Object.keys(dataObject).join(',');
          const amountItems = `${Object.values(dataObject).map((el,i)=>`$${i+1}`)}`
          const sql = `INSERT INTO ${nameDb} (${keys}) VALUES(${amountItems});`;
          const values = Object.values(dataObject)
          console.log({sql, values})
          await pool.query(sql,values);
          //  return true;
         } catch (e) {
           console.error("Error adding document: ", e);
           return false;
         }
        }
        currentData = {};
      }
      

      return {
        info:{
          message: 'ok, data add into db',
          status: true
        }
      }
    } catch (error) {
      throw error;
    } // 
  }

  async getData(){
    try {
      const result = await pool.query('SELECT * from diucha;')
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  deleteData(){

  }

  putData(){

  }
}

export  {
  queryDataBasePostgress
};
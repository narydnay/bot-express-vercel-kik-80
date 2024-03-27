import { Pool } from 'pg';
import { ExcelDateToJSDate, getAmountItemsDb, getKeysFromDb, getKeysUpdateFromDb, getValuesDb } from '../helpers/helper';

const pool = new Pool({
  host: '193.0.61.232',
  port: 6432,
  database: 'kik',
  user: 'admin',
  password: 'oSLxPwYigQkKZoNAacRRNTFX3HD69IO9SEFpJhE0wyzyhUAwDd',
})


class queryDataBasePostgress {
  client = pool.connect();
  async setData(data, nameTableDb){
    try {
      let initDataObject = {
        name: '',
        full_age: '',
        otd: '',
        code_article: '',
        period_punish: '',
        isguard: '',
      }
      let dataObject = {};
      const checkEntrySql = `SELECT * FROM ${nameTableDb};`;
      const listCurrentEntry = (await pool.query(checkEntrySql)).rows;
      // console.log({listCurrentEntry: listCurrentEntry})
      let countWrite = 0;
      let countUpdateWrite = 0;
      let errorWar = [];
      for (let i = 4; i < 9999; i++) {
        let notEntryIntoDb = true;
        dataObject = initDataObject;
        for (let key of Object.keys(data)) {
          if(data['E'+i] === undefined) break;
          if(key === '!margins' || key === '!autofilter'){}else{
            if(key.includes(i)){
              `//  П.І.Б. "name": "Єгоров Андрій Олексійович",`
              if('E'+i === key){
                let full_name = data[key]['v'].trim().replace('  ', ' ').replace('`', '\'').replace("'", '\'')
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
              //  Статус                              
              if('CP'+i === key){
                dataObject = {
                  ...dataObject,
                  isguard: data[key]['v']
                }
              }
            }
          }
        }
        if(dataObject?.name){
          try {
            //  заносим данные в бд

            /**
             * check the entry data into db'
             * if true => change via popup 
             * else add new row
             * 
             */
            console.log('date 1 = ', dataObject.name)
            for(let curEntry of listCurrentEntry){
              if(curEntry.name === dataObject.name && new Date(curEntry.full_age).toISOString() === dataObject.full_age.toISOString()){
                notEntryIntoDb = false;
                // console.log('date_3 = ', curEntry.name === dataObject.name)
                // console.log('date_4 = ', new Date(curEntry.full_age).toISOString() === dataObject.full_age.toISOString())
                const setKeys = getKeysUpdateFromDb(dataObject);
                const changeDataDbSql = `UPDATE ${nameTableDb} SET ${setKeys} WHERE name = '${dataObject.name.replace('\'', '\'\'')}' AND full_age::date = '${(dataObject.full_age).toISOString()}'`
                const values = getValuesDb(dataObject);
                countUpdateWrite = countUpdateWrite + 1
                console.log('date 2 = ', changeDataDbSql, values)
                try {
                  await pool.query(changeDataDbSql, values);
                  
                } catch (error) {
                  console.log(error)
                  errorWar.push(error.message)
                }
            }            
          }  
          
          if(notEntryIntoDb){
            const keys = getKeysFromDb(dataObject);
            const amountItems = getAmountItemsDb(dataObject);    
            const values = getValuesDb(dataObject);
            const sqlAddRow = `INSERT INTO ${nameTableDb} (${keys}) VALUES(${amountItems});`;              
            // console.log({sqlAddRow, values})
            countWrite = countWrite + 1;
            await pool.query(sqlAddRow,values);
          }
          //  return true; 
         } catch (e) {
           console.error("Error adding document: ", e);
           return {
            info:{
              message: 'Error додавання до бади данних' + e.message,
              status: false
            }
          };
         }
        }
      }

      return {
        info:{
          message: `З вкладки ${nameTableDb} було додано ${countWrite}, оновлено ${countUpdateWrite} записiв, помилок ${errorWar.length}, ${errorWar}`,
          status: true
        }
      }
    } catch (error) {
      throw error;
    } // 
  }

  async setDataDb( table, data ){ 
    try {      
      const keys = Object.keys(data).join(',');
      const amountItems = `${Object.values(data).map((el,i)=>`$${i+1}`)}`
      const sql = `INSERT INTO ${table} (${keys}) VALUES(${amountItems});`;
      const values = Object.values(data)
      await pool.query(sql,values);
    } catch (error) {
      throw error
    }
  }

  async getData(table = 'diucha', query = '*', where = '', order_by = ''){
    try {
      let sql = `SELECT ${query} from ${table}`
      if(where){
        sql = sql + ` WHERE (${where})`
      }
      if(order_by){
        sql = sql + ` ORDER BY (${order_by})`
      }
      sql = sql + ';';
      console.log({sql})
      const result = await pool.query(sql)
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
  
  deleteData(){
    // DELETE FROM table_name WHERE condition RETURNING (select_list | *)
  }
  
  async putData(table, where='', data='', returning=''){
    
    try {
      let sql = `UPDATE ${table} SET ${data} WHERE ${where};`;
      if(returning){
        sql = `UPDATE ${table} SET ${data} WHERE ${where} RETURNING ${returning} ;`;
      }
      console.log({sql})
      const result = await pool.query(sql)
      return result?.rows;
    } catch (error) {
      throw error;
    }
  }
}

export  {
  queryDataBasePostgress
};
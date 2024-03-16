import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'mybase',
  user: 'admin',
  password: '11111111',
})


class queryDataBasePostgress {
  client = pool.connect();
  async setData(data, nameDb){
    try {
      const keys = Object.keys(data).join(',');
      const amountItems = `${Object.values(data).map((el,i)=>`$${i+1}`)}`
      const sql = `INSERT INTO ${nameDb} (${keys}) VALUES(${amountItems});`
      const values = Object.values(data)
      await pool.query(sql,values);
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

  async getData({nameField = 'name', qOperant = '!=', value = false}){
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
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { config } from 'src/config/config';

const fbApp = initializeApp({
  credential: cert(config.get('serviceAccount'))
});
const db = getFirestore(fbApp);

class queryDataBase {
  async setData(data, nameDb){
    try {
      await db
            .collection(nameDb)
            .doc(data.name)
            .set({
              ...data,
              dateCreate: Timestamp.fromDate(new Date()),
              dateUpdate: null,
            });
    } catch (error) {
      throw error;
    }
  }

  async getDataFromDb({nameField = 'name', qOperant = '!=', value = false}){
    try {

      let results = [];
      const dbConnect = db.collection('mybase');
      // console.log(dbConnect)
      const listData = await dbConnect.where(nameField,qOperant, value ).get()
      if (listData.empty) {
        return {
          message: 'Data not find.',
        };
      }  
      listData.forEach( doc => {
        // console.log(doc.id, '=>', doc.data());
        let obj = {};
        obj = doc.data();
        results.push(obj)
      });
      return results;      
    } catch (error) {
      throw error;
    }
  }

  deleteData(){

  }

  putData(){

  }
}

export default queryDataBase;
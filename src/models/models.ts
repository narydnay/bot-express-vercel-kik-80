// const {initializeApp} = require('firebase/app');
// const { getFirestore, collection, addDoc, getDoc, doc, namedQuery, refEqual } = require('firebase/firestore');
// converters are used with `setDoc`, `addDoc`, and `getDoc`

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { join } from 'path';

const certData:string = join(__dirname, '../','config/','t-b-kik-80-firebase-adminsdk-9tb50-407289ee90.json');
const fbApp = initializeApp({
  credential: cert(certData)
});
const db = getFirestore(fbApp);

type SetData = (data: object, nameDb: string) => object

class queryDataBase {
  // async setData(data, nameDb):void{
  //   try {
  //     await db
  //           .collection(nameDb)
  //           .doc(data.name)
  //           .set({
  //             ...data,
  //             dateCreate: Timestamp.fromDate(new Date()),
  //             dateUpdate: null,
  //           });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async getDataFromDb({nameField = 'name', qOperant = '!=', value = false}){
    try {

      let results:[] = [];
      const dbConnect = db.collection('mybase');
      // console.log(dbConnect)
      const listData = await dbConnect.where(nameField,qOperant!, value ).get()
      if (listData.empty) {
        return {
          message: 'Data not find.',
        };
      }  
      listData.forEach( doc => {
        // console.log(doc.id, '=>', doc.data());
        results.push(doc.data())
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

export {queryDataBase};
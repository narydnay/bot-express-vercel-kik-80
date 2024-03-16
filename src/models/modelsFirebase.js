// import { getApp, initializeApp } from "firebase/app";
// import { collection, addDoc, getFirestore, setDoc, doc, getDocs } from "firebase/firestore";
import { ExcelDateToJSDate } from '../helpers/helper';
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


initializeApp({
  credential: cert({
    "type": "service_account",
    "project_id": "t-b-kik-80",
    "private_key_id": "407289ee902d5c56a1787a18a4621109d3d3198d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDc4SBJfvJUt0iW\nhC6K8QU/6DNEZ+dWC87Fyo3pV2V96F7kBZ9E2OcEuP4yru3ekTchUUS3JBNG5h2V\n6GRnLUNFKQ1gKPNmJWNeTkJGn7FZ/BXK/YAyjTI6dXrbWkYFf0TqMWWmf42LncLd\nYC/+2hNZiJbWjrnf+4aGA/pUOLCSKMPdPQy4oI3Ej/2nNtevbVQgxSopX2DYqd76\nayD6uKI73GZ3JOR9KnpRW7EFNfQNtnRu6h+PVoIX+K8eIXs+1Znmka7ok2QRq3G0\nisJ2ChMQSz2WhULs5cip1W4utzgnEOvZgN2004IIiJTuvqwA1uvaU9DXYdZHrURL\n302Pv63hAgMBAAECggEAEuIJK1dXur/XjAydWQH9Z6b/eQXj/FJymSy1oKD424B5\n2kcTxGRBrcDt9GHJkqk5/BZxSDHklv9VwKrXKI3xThCSJOojUtR38AhDOLvuwslf\nCJVO+CNji6Ve/TE0wsQMXXQfI1KMxIaWcewG9mPo2xLnCE033Urox3zAEiKtj7UV\nP+KAbXb7vm/pLDR/kg35Pvp8NxcHafevkVed/FJ9lTLF2+9162v/YuHvEKch2sY1\n9+cbz/016dEZmj8Dxw7X55MMC7+UBlLUMaHf9a3aG3+/gCYSwSYU+PL7qzR38d/x\nlrEqfDmcbV0ojPNYpKNBQgNNoVEEFVPYFK3D/uBNpQKBgQD6+Orrej/ozyMYE8TU\nziouc/LSAlPkZu3CQYz17iYYaYjtdS5Rd4fppDHAMELjAAn4Q2J4AMX2U0ddHGXu\n86GtkfTvOYf+JqgL26CfqpZ6etWlE1MtgZDNLty2SPBtrRHS+MC4VnNsV3mVOHzP\n0nAKu76259RkN1epqafqvKD7jQKBgQDhTeFe9qU34mwDHzKONv1W0aCWp9DxeQG1\n7+JBB5fU34yM9D2zRj9AUkSje6Ws+ypjprM/Am07Cn9ts/uJ0rU4rIaPVAslUHHG\n8bvJ6++Fpr+4KKdj9v8fL+bhuEi1dyhBevjF3cKCaqHSdeqbcrRU8o432NZFgo5P\n0tnV3sq8pQKBgQCh0IIvB2hTY9JdwMlE6BRcVRf3fda3SgH8IKWRH1ZioRDPAaG2\nlxoDc4E8SCGoGKtU7aV8eAsrUfCOQTQbx+uzbIr+/xoGrMfmtVmv+J4DJFXBlF8p\n1QMWuCNISGj0XgVDAG3JrLvI2/GhW4VlvWnOEdTaO0k+wEv+MUv51lr5NQKBgQCp\n1AKlilVPoqS4VbPN7zVXU/wwk56z5fqcIY3yZr7T/w360cAQeksDOP/0GyfvFAQH\nyYgjXrjnYCpdjuV0Jhfj+GgVccxU/CZHR7+9nNKXc/Hf5wUGHRCBeaIXUsm7v23g\nrckHnPkZRTdlZOzK79NulMcO4aviCV8sXEtHIwC+4QKBgQDUR7x7JigyhvrsU9y1\nL+fqysYNEcaZeXPPaKOAIPdYCBLOnAFlkLlFh7d/WBcqbVmTj2lYMsPxpSJbZ6+c\nq4ZyF6yPBFIeQv0XD4+OHKAzjQbuiGWUBclWHAKhxaDDvoVCBBINhzZivT6nb8ea\n5EmhIbAeoqaTd+IuourQZlVdQw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-9tb50@t-b-kik-80.iam.gserviceaccount.com",
    "client_id": "102326903510922639303",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9tb50%40t-b-kik-80.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  })
});

const db = getFirestore();

// const app = initializeApp({
//   apiKey: "AIzaSyDArYuP8lbb94JbErr6Y3xKwQS2oPE_zTc",
//   authDomain: "t-b-kik-80.firebaseapp.com",
//   projectId: "t-b-kik-80",
//   storageBucket: "t-b-kik-80.appspot.com",
//   messagingSenderId: "513130161339",
//   appId: "1:513130161339:web:10285471a898b1a7f5759e",
//   measurementId: "G-D1X8CLDW6X"
// });

// const db = getFirestore(app);


class queryDataBaseFirebase {
  async setData(data, nameDb) {
    try {
      let initDataObject = {
        pib: {
          full_name: '',
          first_name: '',
          last_name: '',
          surname: ''
        },
        full_age: '',
        otd: '',
        location: {
          place_birth: '',
          place_live: '',
        },
        curt: {
          date_curt: '',
          name_curt: ''
        },
        code_article: '',
        period_punish: '',
        start_punish: '',
        end_punish: '',
        date_obtain: '',
        prev_punish: '',
        data_isActive: '',
        data_first: '',
        data_second: '',
        data_thirt: '',
        data_forty: '',
        status_prisoner: '',
        daties__fact_place_live: [],
        daties__change_place_live: [],
        humer: {
          humer_for_escape: null,
          humer_for_aggresion: null,
          humer_for_suside: null,
          humer_for_selfharm: null,
          humer_for_bad_behavior: null,
          humer_for_drink: null,
        },
        work: {
          name_organization: [],
          shift_at_work: [],
          shift_work_weekend: []
        },
        work_chart: '',
        status: null,
        dateCreate: null,
        dateUpdate: [],
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
                let first_name = pib[0] ?? '';
                let last_name = pib[1] ?? '';
                let surname = pib[2] ?? '';
                dataObject = {
                  ...dataObject,
                  pib: {
                    full_name,
                    first_name,
                    last_name,
                    surname,
                  }
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
              //  Місце народження `"place_birth": "Дніпропетровська обл., м.Синельникове",`
              if('H'+i === key){
                dataObject = {
                  ...dataObject,
                  location: {
                    ...dataObject.location,
                    place_birth: data[key]['v'],
                  }
                }
              }
              //  Адреса проживання (реєстрації ) `"place_live": "Дніпропетровська обл., м.Синельникове, вул.огдана мельницького,17",`
              if('I'+i === key){
                dataObject = {
                  ...dataObject,
                  location: {
                    ...dataObject.location,
                    place_live: data[key]['v']
                  }
                }
              }
              //  Дата суда `"date_curt": "04.11.2022 22.01.2020 (1суд)",`
              if('J'+i === key){
                dataObject = {
                  ...dataObject,
                  curt: {
                    ...dataObject.curt,
                    date_curt: ExcelDateToJSDate(data[key]['v'])
                  }
                }
              }
              //  Найменування суду `"name_curt": "Синельниківським міськрайонним судом Дніпропетровської області",`
              if('K'+i === key){
                dataObject = {
                  ...dataObject,
                  curt: {
                    ...dataObject.curt,
                    name_curt: data[key]['v']
                  }
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
              //  Початок строку                              `"start_punish": "12.08.2021",`
              if('N'+i === key){
                dataObject = {
                  ...dataObject,
                  start_punish: ExcelDateToJSDate(data[key]['v'])
                }
              }
              //  Кінець строку                               `"end_punish": "12.08.2026",`
              if('O'+i === key){
                dataObject = {
                  ...dataObject,
                  end_punish: ExcelDateToJSDate(data[key]['v'])
                }
              }
              //  Прибув до колонії                           `"date_obtain": "04.09.2021",`
              if('Q'+i === key){
                dataObject = {
                  ...dataObject,
                  date_obtain: ExcelDateToJSDate(data[key]['v'])
                }
              }
              //  Раніші судимості                            `"prev_punish": "",`
              if('AF'+i === key){
                dataObject = {
                  ...dataObject,
                  prev_punish: ExcelDateToJSDate(data[key]['v'])
                }
              }
              //  непорядок                                   `"data_isActive": ""`
              if('AL'+i === key){
                dataObject = {
                  ...dataObject,
                  data_isActive: data[key]['v']
                }
              }
              //------------ //  інфо 1                      `"data_first": "",`
                            if('AJ'+i === key){
                              dataObject = {
                                ...dataObject,
                                data_first: ExcelDateToJSDate(data[key]['v'])
                              }
                            }
              //------------ //  інфо	2                                `"data_second": "",`
                            if('AK'+i === key){
                              dataObject = {
                                ...dataObject,
                                data_second: ExcelDateToJSDate(data[key]['v'])
                              }
                            }
              //------------ //  інфо 3                     `"data_thirt": "",`
                            if('AM'+i === key){
                              dataObject = {
                                ...dataObject,
                                data_thirt: ExcelDateToJSDate(data[key]['v'])
                              }
                            }
              //------------ //  інфо	4                               `"data_forty": "",`
                            if('AN'+i === key){
                              dataObject = {
                                ...dataObject,
                                data_forty: ExcelDateToJSDate(data[key]['v'])
                              }
                            }
              //-----------------           
              //  Статус Засудженого                          `"status_prisoner": "",`
              if('AO'+i === key){
                dataObject = {
                  ...dataObject,
                  status_prisoner: data[key]['v']
                }
              }
              //  Дата фактического распределения             `"daties__fact_place_live": "",`
              if('AP'+i === key){
                const arrDataFactPlace = data[key]['v'].split(';');

                dataObject = {
                  ...dataObject,
                  daties__fact_place_live: arrDataFactPlace
                }
              }
              //  Дата переведення на інше відділення         `"daties__change_place_live": "",`
              if('AQ'+i === key){
                const arrDataChangePlace = data[key]['v'].split(';');
                dataObject = {
                  ...dataObject,
                  daties__change_place_live: arrDataChangePlace
                }
              }
              //  Втеча                                       `"humer_for_escape": "",`
              if('BR'+i === key){
                dataObject = {
                  ...dataObject,
                  humer: {
                    ...dataObject.humer,
                    humer_for_escape: data[key]['v'],
                  }
                }
              }
              //  нападу                                      `"humer_for_aggresion": "",`
              if('BS'+i === key){
                dataObject = {
                  ...dataObject,
                  humer: {
                    ...dataObject.humer,
                    humer_for_aggresion: data[key]['v'],
                  }
                }
              }
              //  суїциду                                     `"humer_for_suside": "",`
              if('BT'+i === key){
                dataObject = {
                  ...dataObject,
                  humer: {
                    ...dataObject.humer,
                    humer_for_suside: data[key]['v'],
                  }
                }
              }
              //  самоушкодження                              `"humer_for_selfharm": "",`
              if('BU'+i === key){
                dataObject = {
                  ...dataObject,
                  humer: {
                    ...dataObject.humer,
                    humer_for_selfharm: data[key]['v'],
                  }
                }
              }
              //  Злосник                                     `"humer_for_bad_behavior": "",`
              if('BV'+i === key){
                dataObject = {
                  ...dataObject,
                  humer: {
                    ...dataObject.humer,
                    humer_for_bad_behavior: data[key]['v'],
                  }
                }
              }
              //  Вживання                                    `"humer_for_drink": "",`
              if('BW'+i === key){
                dataObject = {
                  ...dataObject,
                  humer: {
                    ...dataObject.humer,
                    humer_for_drink: data[key]['v'],
                  }
                }
              }
              
              // 		
                //  РОЗНАРЯДКА
              if('CA'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    name_organization: [...dataObject.work?.name_organization, data[key]['v']],
                  }
                }
              }
              if('CB'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    name_organization: [...dataObject.work.name_organization, data[key]['v']],
                  }
                }
              }
              if('CC'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    name_organization: [...dataObject.work.name_organization, data[key]['v']],
                  }
                }
              }
              if('CD'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    name_organization: [...dataObject.work.name_organization, data[key]['v']],
                  }
                }
              }
              // смена будни
              if('CE'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    shift_at_work: [...dataObject.work.shift_at_work, data[key]['v']? "1": ''],
                  }
                }
              }
              if('CF'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    shift_at_work: [...dataObject.work.shift_at_work, data[key]['v']? "2": ''],
                  }
                }
              }
              if('CG'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    shift_at_work: [...dataObject.work.shift_at_work, data[key]['v']? "3": ''],
                  }
                }
              }
               // смена выходной
               if('CI'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    shift_work_weekend: [...dataObject.work.shift_work_weekend, data[key]['v']? "1": ''],
                  }
                }
              }
               if('CJ'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    shift_work_weekend: [...dataObject.work.shift_work_weekend, data[key]['v']? "2": ''],
                  }
                }
              }
               if('CK'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    shift_work_weekend: [...dataObject.work.shift_work_weekend, data[key]['v']? "1": ''],
                  }
                }
              }
               if('CL'+i === key){
                dataObject = {
                  ...dataObject,
                  work: {
                    ...dataObject.work,
                    shift_work_weekend: [...dataObject.work.shift_work_weekend, data[key]['v']? "2": ''],
                  }
                }
              }
              //  График	                                    `"work_chart": "",`
              if('CM'+i === key){
               dataObject = {
                 ...dataObject,
                 work_chart: data[key]['v']
               }
             }
             // status KIK-80
              if('CP'+i === key){
               dataObject = {
                 ...dataObject,
                 status: data[key]['v']
               }
             }
             
             dataObject = {
              ...dataObject,
              dateCreate: new Date()
            }

              // currentData={
              //   ...currentData,

              //   [key]: data[key]
              // }
            }
          }
        }
        // console.log({dataObject})
        if(dataObject?.pib?.full_name){ 
          try {
          //  заносим данные в бд
          //  name = , dataObject?.pib?.full_name+'{'+ dataObject?.pib?.full_age +'}'
          let options = {
          };
          // console.log('date = ', dataObject)
          // console.log('date 1 = ', dataObject.full_age?.toLocaleDateString("tr-TR"))
          const subBase = dataObject?.pib?.full_name +' {' + dataObject?.full_age.toLocaleDateString("tr-TR", options) + '}'
          console.log(`${i-3}`,{subBase})
           resultSend = await setDoc(doc(db, nameDb, subBase), dataObject);
           return true;
         } catch (e) {
           console.error("Error adding document: ", e);
           return false;
         }
        }
        currentData = {};
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getData({nameDb = 'mybase', nameField = 'dateCreate', qOperant = '!=', value = false }) {
    try {
      let results = [];

      const dbConnect = db.collection('mybase');
      // console.log(dbConnect)
      const listData = await dbConnect.where(nameField, qOperant, value).get()

      if (listData.empty) {
        return {
          message: 'Data not find.',
        };
      }
      listData.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        let obj = {};
        obj = doc.data();
        results.push(obj)
      });
      return results;
    } catch (error) {
      throw error;
    }
  }

  deleteData() {

  }

  putData() {

  }
}




export {
  queryDataBaseFirebase
};

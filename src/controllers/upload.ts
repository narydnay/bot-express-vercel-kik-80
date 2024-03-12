import { Request, Response, NextFunction } from "express";
import multer from 'multer';
import { parse } from 'csv-parse/sync';
import queryDataBase from "../models/models";

export const uploadCsv = async (req:Request, res: Response): Promise<Response> => {
  const db = new queryDataBase()
  const upload = multer().single('upload_csv');
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Случилась ошибка Multer при загрузке.
      return res.status(500).json({
        info: {
          message: 'Сталася помилка Multer під час завантаження. Зв\'яжіться з адміністратором.',
          status: false
        }
      })
    } else {      
      try {
        const { file } = req;
        if (Object.keys(file).length) {
          const { fieldname, originalname, encoding, mimetype, buffer, size } = file
          // console.log({ fieldname, originalname, encoding, mimetype, buffer, size })
          const data = await parse(buffer);
          for (let prisoner of data) {
            const prisonerData = {
              name: prisoner[0],
              full_age: prisoner[1],
              otd: prisoner[2],
              code_article: prisoner[3],
              period_punish: prisoner[4],
              image_url: prisoner[0] + '{' + prisoner[1] + '}',
              isGuard: true
            }
            db.setData(prisonerData, 'diucha');
          }
        }
        
        return res.status(200).json({
          info:{
            message: 'Файл успішно завантажено.',
            status: true
          }
        })
        
      } catch (error) {
        // При загрузке произошла неизвестная ошибка.
        return res.status(500).json({
          info:{
            message: 'Під час завантаження сталася невідома помилка.',
            status: false
          }
        })
      }
    }
  })
  return
}
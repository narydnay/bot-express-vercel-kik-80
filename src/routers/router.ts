import { Router, Request, Response } from "express";
import { uploadCsv, uploadXls } from "../controllers/upload";
import { adminCustom } from "../controllers/adminCustom";
import { queryDataBasePostgress } from "../models/modelsPostgress";

export const route = Router();

route.get('/test', async (req:Request, res:Response) => {
  try {

    const db = new queryDataBasePostgress()
    const result = await db.getData();

    res.status(200).json({message: 'send message success!', res: JSON.stringify(result,null,4)})
  } catch (error) {
    res.status(500).json({message: `Error! ${error.message}`});    
  }
})


route
.get('/kik-admin', adminCustom)
.post('/upload-csv', uploadCsv)
.post('/upload-xls', uploadXls)

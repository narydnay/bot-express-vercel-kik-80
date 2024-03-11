import { Router, Request, Response } from "express";
import queryDataBase from "../models/models.js";
export const route = Router();

const db = new queryDataBase()

route.get('/test', async (req:Request, res:Response) => {
  try {
    
    const listPrisoner = await db.getDataFromDb({nameField: 'name', qOperant: '!=', value:false});
    res.status(200).json({message: 'send 3 message success!', listPrisoner})
  } catch (error) {
    res.status(500).json({message: `Error! ${error.message}`});    
  }
})


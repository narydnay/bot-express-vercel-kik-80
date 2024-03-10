import { Router, Request, Response } from "express";
export const route = Router();


route.get('/test', (req:Request, res:Response) => {

  res.status(200).json({message: 'send 2 message success!'})
})


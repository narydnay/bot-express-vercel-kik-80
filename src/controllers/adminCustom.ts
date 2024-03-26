import { Request, Response } from "express"

export const adminCustom = async (req:Request, res: Response) => {
  
  try {
    return res.status(200).json({
      info:{
        status: true,
        message: 'Добро пожаловать2'
      }
    })
  } catch (error) {
    throw error;
  }
}
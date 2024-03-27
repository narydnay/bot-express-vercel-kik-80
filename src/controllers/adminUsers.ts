import { Request, Response } from "express"
import { queryDataBasePostgress } from "../models/modelsPostgress";

export const adminUsers = async (req:Request, res: Response) => {
  const db = new queryDataBasePostgress();

  try {
    const result = await db.getData('users', '*', '', 'id');

    // console.log(result)
    return res.status(200).json({
      info:{
        status: true,
        message: 'Добро пожаловать adminUsers'
      },
      count: result.length,
      results: result
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const adminUserProfile = async (req:Request, res: Response) => {
  const db = new queryDataBasePostgress();

  try {
    console.log(req)
    const {id_telegram } = req.query;
    const where = `id_telegram = ${id_telegram}`
    const result = await db.getData('users','*', where);

    return res.status(200).json({
      info:{
        status: true,
        message: `Данные были получены для ${id_telegram}`
      },
      count: result.length,
      results: result
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const adminAccess = async (req:Request, res: Response) => {
  const db = new queryDataBasePostgress();

  try {
    console.log(req)
    const {is_active, id_telegram } = req.body;
    const where = `id_telegram = ${id_telegram}`;
    const data = `is_active = ${is_active}, is_blocked = ${!is_active}`
    const result = await db.putData('users', where, data, '*');

    return res.status(200).json({
      info:{
        status: true,
        message: 'Данные были изменнены'
      },
      count: result.length,
      results: result
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}

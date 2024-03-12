import { Router, Request, Response } from "express";
import queryDataBase from "../models/models.js";
import { uploadCsv } from "../controllers/upload";
import { adminCustom } from "../controllers/adminCustom";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getApp, initializeApp } from "firebase/app";

const app = initializeApp({
  apiKey: "AIzaSyDArYuP8lbb94JbErr6Y3xKwQS2oPE_zTc",
  authDomain: "t-b-kik-80.firebaseapp.com",
  projectId: "t-b-kik-80",
  storageBucket: "t-b-kik-80.appspot.com",
  messagingSenderId: "513130161339",
  appId: "1:513130161339:web:10285471a898b1a7f5759e",
  measurementId: "G-D1X8CLDW6X"
});

const firebaseApp = getApp();

export const route = Router();

const db = new queryDataBase()

route.get('/test', async (req:Request, res:Response) => {
  try {
    const storage = getStorage(firebaseApp, "gs://t-b-kik-80.appspot.com");
    const spaceRef = ref(storage, '/cards_prisoner/Азамат Іван Миколайович {23.02.1995}.JPG');
    const link = await getDownloadURL(spaceRef)
    res.status(200).json({message: 'send 3 message success!', res: JSON.stringify(spaceRef,null,4)})
  } catch (error) {
    res.status(500).json({message: `Error! ${error.message}`});    
  }
})


route
.get('/kik-admin', adminCustom)
.post('/upload-csv', uploadCsv)

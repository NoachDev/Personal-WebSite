import { NextApiRequest, NextApiResponse } from "next"
import { mongoDb } from "../../lib/clients"

export async function handler(req : NextApiRequest, res : NextApiResponse){

  let data = {}
  
  await mongoDb.connect()

  const result : Array<Object>= await mongoDb.db("Home").collection("images").find({}).toArray()

  result.forEach((val, index) => { data[index] = {...val, _id : val["_id"].toJSON() } } )

  if (res === null){
    return data
  }
  
  await mongoDb.close()
  
  res.status(200).json(data)
  res.end()
}

export default handler
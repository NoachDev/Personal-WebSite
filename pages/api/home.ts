import { NextApiRequest, NextApiResponse } from "next"
import { clientMongoDb } from "../../lib/clients"

export async function getData(collection : string){
  let data = {}

  const client = clientMongoDb()

  try{
    await client.connect()
    
    const result = await client.db("Home").collection(collection).find().toArray()
    result.forEach((val, index) => { data[index] = {...val, _id : val["_id"].toJSON() } } )

  }

  finally{
    client.close()
  }

  return data
}

export async function handler(req : NextApiRequest, res : NextApiResponse){
  
  const body = JSON.parse(req.body)

  res.setHeader('Cache-Control', 's-maxage=86400');

  res.status(200)
  res.json(await getData(body.collection))
  res.end()

  return res
}

export default handler
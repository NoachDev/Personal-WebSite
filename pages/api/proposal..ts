import { NextApiRequest, NextApiResponse } from "next";
import { UserConnect } from "../../middleware/mongoose";
import { headModel, proposalModel } from "../../models/users";
import { clientMongoDb } from "../../lib/clients";

async function checkExist(place : string, name : string){
  let result = null

  const client = clientMongoDb()

  try{
    await client.connect()
    
    result = await client.db("Home").collection(place).findOne({name : name}).then(x => x ? true : false)

  }

  finally{
    client.close()
  }

  return result
}

async function handler(req : NextApiRequest, res : NextApiResponse){
  const body = JSON.parse(req.body)

  if (!await checkExist(body.place, body.name)){
    res.status(500)
    res.end()
    return
  }

  const userId = await headModel.findOne({_sb : body._sb}).exec().then(x => x.id)
  
  console.log(userId);

  const proposal = {
    type : "proposal",
    content : body.content,
    name : body.title,
    files : body.files
  }

  await proposalModel(userId).create(proposal)

  res.status(200)
  res.end()
  
}

export default UserConnect(handler)
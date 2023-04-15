import connect_public from "./client"
import mongoose from "mongoose"
import { dbAdminHomeConnect } from "../../lib/dbConnect"

import {nodeInterface, nodeModel} from "../../models/node"
import { ApiError } from "next/dist/server/api-utils"

const locageStr = (l : number) => {
  switch (l){
    case 0:
      return "drawings"
    case 1:
      return "ux/ui"
    case 2:
      return "programs"
  }
}

const locageInt = (l : string) => {
  switch (l){
    case "drawings":
      return 0
    case "ux/ui":
      return 1
    case "programs":
      return 2
  }
}

async function getNode(res){
  
  let data = {}

  try {
    const result = await connect_public()
    
    result.forEach((val, index) => data[index] = {...val, locage : locageStr(val["locage"])})

    res.json(data)
  }
  
  catch(e){
    res.json({})
    throw new ApiError(500, "error on try connect with Home, User : public")

  }

}

export async function addNode(res, content : nodeInterface) {
  try{
    await dbAdminHomeConnect();
  }
  catch{
    throw new ApiError(500, "connect Db Home , User : Admin")
  }

  const {_id, ...schema} = content;
  
  if (_id == "new"){
    await nodeModel().create({...schema, locage : locageInt(String(schema.locage)), _id : new mongoose.Types.ObjectId().toHexString()});
  }
  
  else{
    const document = await nodeModel().findById(content._id).exec();

    document.src = schema.src
    document.name = schema.name
    document.content = schema.content
    document.locage = locageInt(schema.locage.toString())
    
    await document.save();
    
  }

  return
  
}

async function removeNode(res : any, id : string){
  try{
    await dbAdminHomeConnect();
  }
  catch{
    throw new ApiError(500, "connect Db Home , User : Admin")

  }

  await nodeModel().deleteOne({_id : id}).exec()
  
  return
}

async function handler(req, res){
  res.setHeader('Cache-Control', 's-maxage=86400');

  if (req.method == "GET"){
    await getNode(res)
  }
  
  else if (req.method == "POST"){
    await addNode(res, JSON.parse(req.body) )
  }

  else if (req.method == "DELETE"){
    await removeNode(res, JSON.parse(req.body)["id"])
  }

  res.status(200);
  res.end()

}

export default handler
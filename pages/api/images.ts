import mongoose from "mongoose"
import { HomeAdminConnect } from "../../middleware/mongoose"

import {nodeInterface, nodeModel} from "../../models/node"
import { NextApiRequest, NextApiResponse } from "next"
import { removeImage, uploadImage } from "../../lib/buckets"


export async function addNode(content : nodeInterface) {
  const {_id, file, ...schema} = content;
  const document = _id == "new" ? new nodeModel({_id : new mongoose.Types.ObjectId().toHexString(), src : "", path : ""}) : await nodeModel.findById(content._id).exec();
  
  const path = file.name ? `${schema.locage}/${file.name}` : ""
  
  if (file.name && document.path != path){
    const bufferData = Buffer.from(file["buffer"].data)

    if (document.src.length > 0){
      removeImage(document.path)
    }

    document.path = path
    document.src = await uploadImage(bufferData, file["file-type"], document.path)
    
  }

  document.name = schema.name
  document.content = schema.content
  document.locage = schema.locage
    
  await document.save();

}
  
export async function removeNode(id : string, path : string){
  await removeImage(path)
  await nodeModel.deleteOne({_id : id}).exec()

}

async function handler(req : NextApiRequest, res : NextApiResponse ){

  const body = JSON.parse(req.body)
  
  res.setHeader('Cache-Control', 's-maxage=86400');

  switch (req.method){
    case "POST":
      await addNode(body)
      break;
      
    case "DELETE":
      await removeNode(body["id"], body["path"])
      break;
  }

  res.status(200)
  res.end()
  
}

export default HomeAdminConnect(handler)
import { ObjectId } from "mongodb"
import mongoose, { Schema, model } from "mongoose"

export interface nodeInterface{
  _id : string,
  path : string,
  src : string,
  locage : string,
  name : string,
  content: string,
  file : {"file-type" : string, name : string, buffer : any},
}

const node = new Schema({
  _id : ObjectId,
  path : String, 
  src : String,
  locage : String,
  name : String,
  content : String
})

export const nodeModel = mongoose["images"] ?? model("images", node)
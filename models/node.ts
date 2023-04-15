import { ObjectId } from "mongodb"

import { Schema, model } from "mongoose"

const node = new Schema({
  _id : ObjectId,
  src : String,
  locage : Number,
  name : String,
  content : String
})

export interface nodeInterface{
  _id : string,
  src : string,
  name : string,
  content: string,
  locage : string | number
}

export const nodeModel = () => model("images", node)
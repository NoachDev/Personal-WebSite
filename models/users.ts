import { ObjectId } from "mongodb"
import mongoose, { Schema, model } from "mongoose"

export interface msgInterface{
  side : string, // left | side
  content : string, // {"file-type" : string, name : string, buffer : any},
  type : string
}

export interface userInterface{
  finished : boolean,
  image : string,
  msgs : Array<msgInterface>,
  _id : string
}

const userHead = new Schema({
  _id : ObjectId,
  name : String,
  finished : Boolean,
  image : String,
})

const userMsg = new Schema({
  side : Boolean, // admin | user
  content : String,
  type : String
})

mongoose.models = {}
export const headModel = model("heads", userHead)
export const userModel = (cll : string) => model(cll, userMsg)
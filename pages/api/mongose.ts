import { ObjectId } from "mongodb"

import mongoose, {Schema, model } from "mongoose"

const imageHome = new Schema({
  _id : ObjectId,
  src : String,
  locage : Number,
  name : String,
  content : String 
})

const imageELm = model("Image", imageHome)
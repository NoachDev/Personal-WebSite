import { NextApiRequest, NextApiResponse } from "next";
import { UserConnect } from "../../middleware/mongoose";
import { headModel, userModel } from "../../models/users";
import { uploadImage } from "../../lib/buckets";
import { ApiError } from "next/dist/server/api-utils";

async function getMsgs(){

  const isAdmin = true;
  const users = await headModel.find().exec()

  let data = {}

  for ( const user of users){

    const result = await userModel(String(user._id)).find().exec();

    data[user.name] = {
      finished : user.finished,
      image : user.image,
      msgs : result.map(x => { return {side : isAdmin == x.side ? "right" : "left", content : x.content, type : x.type}}),
      _id : String(user._id)
    }

  }

  return data

}

async function addMsg(body) {
  let content : string = body.type == "text" ? body.content : await uploadImage(
      Buffer.from(body.content.buffer.data),
      body.content["file-type"],
      `${body._id}/${body.content.name}`,
      "Users"
    )

  await userModel(body._id).create({
    side : body.user, // user (admin -> true : another : false )
    content : content,
    type : body.type
  }).catch(() => {
    throw new ApiError(500, "errorn on create msg in mongoose")
  })

}

async function handler(req : NextApiRequest, res : NextApiResponse){
  const body = JSON.parse(req.body)
  
  switch (req.method){
    case "GET":
      res.json(await getMsgs())
      break;

    case "POST":
      await addMsg(body)
      break;
  }

  res.status(200)
  res.end()
  
}

export default UserConnect(handler)
import mongoose from "mongoose"

function mongooseCheck(db : string) : boolean{
  if (mongoose.connections[0].readyState){
    if (mongoose.connections[0].name != db){
      mongoose.connections[0].useDb(db)
      return true

    }

    return true
  }

  return false
}

async function mongooseMain(db : string, uri : string){
  if (!mongooseCheck(db)){
    await mongoose.connect(uri + process.env.MONGO_DB_MAIN_CLUSTER + db + process.env.MONGO_DB_URI_OPTS)
  }

}

export const UserConnect = (handler) => async function(req, res){
  const db = "Users"

  await mongooseMain(db, process.env.MONGO_DB_USER_MAIN_URI)
  
  req.body["user"] = false
  return handler(req, res)
}

export const HomeAdminConnect = (handler) => async function(req, res){
  const db = "Home"
  
  await mongooseMain(db, process.env.MONGO_DB_ADMIN_MAIN_URI)

  return handler(req, res)
}
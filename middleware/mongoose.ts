import mongoose from "mongoose"

export const HomeAdminConnect = (handler) => async function(req, res){
  if (!mongoose.connections[0].readyState){
    mongoose.connect(process.env.MONGO_DB_ADMIN_MAIN_URI + process.env.MONGO_DB_MAIN_CLUSTER + "Home" + process.env.MONGO_DB_URI_OPTS)
  }

  console.log("to handler");
  

  return handler(req, res)
}

export const HomePublicConnect = (handler) => async function(req, res){
  if (!mongoose.connections[0].readyState){
    mongoose.connect(process.env.MONGO_DB_PUBLIC_URI + process.env.MONGO_DB_MAIN_CLUSTER + "Home" + process.env.MONGO_DB_URI_OPTS)
  }

  return handler(req, res)
}
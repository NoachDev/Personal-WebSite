import mongoose from "mongoose"

let cachedAdminHome = global.mongoose

if (!cachedAdminHome) {
  cachedAdminHome = global.mongoose = { conn: null, promise: null }
}


export async function dbAdminHomeConnect(){
  if (cachedAdminHome.conn){
    return cachedAdminHome.conn
  }

  if (!cachedAdminHome.promise){

    cachedAdminHome.promise = mongoose.connect(process.env.MONGO_DB_ADMIN_URI + "Home" + process.env.MONGO_DB_URI_OPTION).then(mongoose => {
        return mongoose
      }
    )

  }

  cachedAdminHome.conn = await cachedAdminHome.promise

  return cachedAdminHome.conn

}
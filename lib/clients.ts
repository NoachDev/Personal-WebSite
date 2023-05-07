import { createClient } from "@supabase/supabase-js";
import { MongoClient, ServerApiVersion } from "mongodb"

const mainUri = process.env.MONGO_DB_PUBLIC_URI + process.env.MONGO_DB_MAIN_CLUSTER + process.env.MONGO_DB_URI_OPTS

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const clientMongoDb = () => new MongoClient(mainUri,  {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
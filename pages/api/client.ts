import { MongoClient} from "mongodb"

async function connect_public(){

  const client = new MongoClient(process.env.MONGO_DB_PUBLIC_URI);
  await client.connect()

  const Data = await client.db("Home").collection("Images").find({}).limit(15).toArray()

  client.close()

  return Data

}

export default connect_public
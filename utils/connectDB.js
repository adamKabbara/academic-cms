import { MongoClient } from 'mongodb'

export default function connectDB() {
  const uri =
    process.env.NODE_ENV === 'development'
      ? 'mongodb://adamkabbara123:adamkabbara123@ac-uenkeqs-shard-00-00.dfotkzq.mongodb.net:27017,ac-uenkeqs-shard-00-01.dfotkzq.mongodb.net:27017,ac-uenkeqs-shard-00-02.dfotkzq.mongodb.net:27017/?ssl=true&replicaSet=atlas-assqju-shard-0&authSource=admin&retryWrites=true&w=majority'
      : process.env.MONGODB_URI

  const client = new MongoClient(uri)
  client
    .connect()
    .then((res) => console.log(console.log('Connected to database!')))
    .catch((e) => console.log('ERROR CONNECTING: ' + e))

  return client
}

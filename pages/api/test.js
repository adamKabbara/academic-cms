import { connectDB } from '../../utils/mongoDB'
import { MongoClient } from 'mongodb'
export default async function handler(req, res) {
  // const client = connectDB()

  // client
  //   .db('Project0')
  //   .collection('posts')
  //   .find({}, (err, result) => {
  //     if (err) throw err
  //     console.log(result)
  //     db.close()
  //   })

  const uri =
    'mongodb://adamkabbara123:adamkabbara123@ac-uenkeqs-shard-00-00.dfotkzq.mongodb.net:27017,ac-uenkeqs-shard-00-01.dfotkzq.mongodb.net:27017,ac-uenkeqs-shard-00-02.dfotkzq.mongodb.net:27017/?ssl=true&replicaSet=atlas-assqju-shard-0&authSource=admin&retryWrites=true&w=majority'

  const client = await new MongoClient(uri)
  await client
    .connect()
    .then((res) =>
      console.log(console.log('CONNECTED SUCCESSFULLY TO MONGODB'))
    )
    .catch((e) => console.log('ERROR CONNECTING: ' + e))

  await client
    .db('Project0')
    .collection('posts')
    .find({}, (err, result) => {
      if (err) console.log(err)
      console.log(result)
      db.close()
    })

  res.json('test')
}

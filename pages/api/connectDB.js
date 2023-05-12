import { MongoClient, ServerApiVersion } from 'mongodb'

export default function handler(req, res) {
  const connectDB = () => {
    const uri =
      // 'mongodb+srv://adamkabbara123:adamkabbara123@cluster0.dfotkzq.mongodb.net/?retryWrites=true&w=majority'
      'mongodb://adamkabbara123:adamkabbara123@ac-uenkeqs-shard-00-00.dfotkzq.mongodb.net:27017,ac-uenkeqs-shard-00-01.dfotkzq.mongodb.net:27017,ac-uenkeqs-shard-00-02.dfotkzq.mongodb.net:27017/?ssl=true&replicaSet=atlas-assqju-shard-0&authSource=admin&retryWrites=true&w=majority'

    const client = new MongoClient(uri)
    client
      .connect()
      .then((res) =>
        console.log(console.log('CONNECTED SUCCESSFULLY TO MONGODB'))
      )
      .catch((e) => console.log('ERROR CONNECTING: ' + e))

    return client
  }

  const addPost = (file, author) => {
    const body = JSON.parse(req.body)
    const buffer = Buffer.from(body.file.data)

    // const post = { file: 'buffer.toString()', author: 'req.' }
    const post = { file: buffer.toString(), author: body.author }

    client
      .db('Project0')
      .collection('posts')
      .insertOne(post, (err, res) => {
        if (err) console.log('ERR' + err)
        console.log('doc added')
        client.close()
      })
  }

  const client = connectDB()
  addPost()
}

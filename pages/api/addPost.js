import { MongoClient, ServerApiVersion } from 'mongodb'
import connectDB from '../../utils/connectDB'

export default function handler(req, res) {
  const addPost = () => {
    const client = connectDB()

    const body = JSON.parse(req.body)
    const fileBuffer = Buffer.from(body.file.data)

    const post = {
      file: fileBuffer.toString(),
      author: body.author,
      thumbnail: body.thumbnail,
    }

    client
      .db('Project0')
      .collection('posts')
      .insertOne(post, (err, res) => {
        if (err) console.log('ERR' + err)
        console.log('doc added')
        client.close()
      })
  }

  addPost()
}

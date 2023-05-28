import { MongoClient, ServerApiVersion } from 'mongodb'
import connectDB from '../../utils/connectDB'

export default function addPost(req, res) {
  const addPost = () => {
    const client = connectDB()

    const body = JSON.parse(req.body)
    const fileBuffer = Buffer.from(body.file.data)

    const post = {
      file: fileBuffer.toString(),
      author: body.author,
      topic: body.topic,
      date: new Date().toLocaleDateString(),
      excerpt: body.excerpt,
      title: body.title,
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

  if (req.method === 'POST') {
    addPost()
  } else {
    res.status(405).end() // Return 405 Method Not Allowed for other methods
  }
}

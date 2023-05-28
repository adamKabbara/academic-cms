import connectDB from '../../utils/connectDB'

export default function deletePosts(req, res) {
  const deletepos = () => {
    const client = connectDB()

    // const body = JSON.parse(req.body)
    // const fileBuffer = Buffer.from(body.file.data)

    // const post = {
    //   file: fileBuffer.toString(),
    //   author: body.author,
    //   topic: body.topic,
    //   date: new Date().toLocaleDateString(),
    //   excerpt: body.excerpt,
    //   title: body.title,
    // }

    // client
    //   .db('Project0')
    //   .collection('posts')
    //   .insertOne(post, (err, res) => {
    //     if (err) console.log('ERR' + err)
    //     console.log('doc added')
    //     client.close()
    //   })
    client
      .db('Project0')
      .collection('posts')
      .deleteMany({ date: '26/05/2023' }, (err, res) => {
        if (err) console.log('ERR' + err)

        client.close()
      })
  }

  // deletepos()

  res.json({ test: 'work' })
}

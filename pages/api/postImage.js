import connectDB from '../../utils/connectDB'
import { MongoClient } from 'mongodb'
import formidable from 'formidable'
import * as fs from 'fs'
import postImages from '../../utils/postImages'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function getPosts(req, res) {
  const form = new formidable.IncomingForm()

  form.parse(req, async function (err, fields, files) {
    let thumbnailBody = await fs.readFileSync(files.thumbnail.filepath)
    thumbnailBody = thumbnailBody.toString('base64')

    const result = await postImages(
      thumbnailBody,
      fields.title.replace(/\s/g, '') + '.jpg'
    )

    console.log(result.json((res) => res).then((data) => console.log(data)))

    return res.status(201).send({ res: 'yes' })
  })
}

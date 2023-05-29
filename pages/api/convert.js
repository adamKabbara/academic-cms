import { WordsApi } from 'asposewordscloud'
import { ConvertDocumentRequest } from 'asposewordscloud'
import formidable from 'formidable'
import path from 'path'
import * as fs from 'fs'
import postImages from '../../utils/postImages'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function convert(req, res) {
  console.log('Converting doc')
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm()

    form.parse(req, async function (err, fields, files) {
      let thumbnailBody = await fs.readFileSync(files.thumbnail.filepath)
      thumbnailBody = Buffer.from(thumbnailBody.toString('base64'))

      postImages(thumbnailBody, fields.title.replace(/\s/g, '') + '.jpg')

      convertToMarkdown(
        files.file,
        fields.author,
        Buffer.from(thumbnailBody),
        fields.title,
        fields.excerpt,
        fields.topic
      )
      return res.status(201).send('')
    })
  } else {
    res.json({ test: 'hello' }) // Return 405 Method Not Allowed for other methods
    res.status(200)
  }
}

const convertToMarkdown = async (
  file,
  author,
  thumbnail,
  title,
  excerpt,
  topic
) => {
  const wordsApi = new WordsApi(
    'af80956f-7ce5-4f2e-a273-b1ca72654d9b',
    '09de9df66660ec7e361903022078e08d'
  )

  const requestDocument = fs.readFileSync(file.filepath)

  console.log('doc', requestDocument)

  const convertRequest = new ConvertDocumentRequest({
    document: requestDocument,
    format: 'md',
  })

  console.log('conv req, ', convertRequest)

  const convertedFile = wordsApi
    .convertDocument(convertRequest)
    .then((convertRequestResult) => {
      saveFile(
        convertRequestResult.body,
        author,
        thumbnail,
        title,
        excerpt,
        topic
      )
    })
    .catch((e) => res.send('THE ERROR ' + e))

  console.log('asdf', convertedFile)
}

const saveFile = async (file, author, thumbnail, title, excerpt, topic) => {
  console.log('Saving File')
  fetch(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/addPost'
      : 'https://academic-cms.vercel.app/api/addPost',
    {
      method: 'POST',
      body: JSON.stringify({ file, author, thumbnail, title, excerpt, topic }),
    }
  )
}

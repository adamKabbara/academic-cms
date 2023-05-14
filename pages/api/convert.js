import { WordsApi } from 'asposewordscloud'
import { ConvertDocumentRequest } from 'asposewordscloud'
import formidable from 'formidable'
import path from 'path'
import * as fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req, res) {
  if (req.method !== 'POST') return

  const form = new formidable.IncomingForm()

  form.parse(req, async function (err, fields, files) {
    const thumbnailBody = await fs.readFileSync(files.thumbnail.filepath)

    convertToMarkdown(files.file, fields.author, Buffer.from(thumbnailBody))
    return res.status(201).send('')
  })
}

const convertToMarkdown = async (file, author, thumbnail) => {
  const wordsApi = new WordsApi(
    'af80956f-7ce5-4f2e-a273-b1ca72654d9b',
    '09de9df66660ec7e361903022078e08d'
  )

  const requestDocument = fs.readFileSync(file.filepath)

  const convertRequest = new ConvertDocumentRequest({
    document: requestDocument,
    format: 'md',
  })

  const convertedFile = await wordsApi
    .convertDocument(convertRequest)
    .then((convertRequestResult) => {
      saveFile(convertRequestResult.body, author, thumbnail)
    })
}

// saveFile(convertRequestResult.body, author)
const saveFile = async (file, author, thumbnail) => {
  fetch('http://localhost:3000/api/addPost', {
    method: 'POST',
    body: JSON.stringify({ file, author, thumbnail }),
  })
}

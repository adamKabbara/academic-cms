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
    convertToMarkdown(files.file, fields.author)
    return res.status(201).send('')
  })
}

const convertToMarkdown = async (file, author) => {
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
      saveFile(convertRequestResult.body, author)
      fs.writeFileSync('testing files/new file.md', convertRequestResult.body)
    })
}

// saveFile(convertRequestResult.body, author)
const saveFile = async (file, author) => {
  // const data = fs.readFileSync(file.filepath)
  // fs.writeFileSync(
  //   path.join(
  //     __dirname,
  //     `../../../../testing files/${file.originalFilename}.docx`
  //   ),
  //   data
  // )
  // await fs.unlinkSync(file.filepath)

  fetch('http://localhost:3000/api/connectDB', {
    method: 'POST',
    body: JSON.stringify({ file, author }),
  })
}

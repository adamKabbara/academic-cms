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
    convertToMarkdown(files.file)
    return res.status(201).send('')
  })
}

const convertToMarkdown = (file) => {
  const wordsApi = new WordsApi(
    'af80956f-7ce5-4f2e-a273-b1ca72654d9b',
    '09de9df66660ec7e361903022078e08d'
  )

  const requestDocument = fs.readFileSync(file.filepath)

  const convertRequest = new ConvertDocumentRequest({
    document: requestDocument,
    format: 'md',
  })

  wordsApi.convertDocument(convertRequest).then((convertRequestResult) => {
    fs.writeFileSync('testing files/new file.md', convertRequestResult.body)
  })
}

const saveFile = async (file) => {
  const data = fs.readFileSync(file.filepath)
  fs.writeFileSync(
    path.join(
      __dirname,
      `../../../../testing files/${file.originalFilename}.docx`
    ),
    data
  )

  await fs.unlinkSync(file.filepath)
}

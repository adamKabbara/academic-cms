import { WordsApi } from 'asposewordscloud'
import { ConvertDocumentRequest } from 'asposewordscloud'
import formidable from 'formidable'
import * as fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function convert(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm()

    form.parse(req, async function (err, fields, files) {
      const data = await convertToMarkdown(
        files.file,
        fields.author,
        fields.title,
        fields.excerpt,
        fields.topic
      )

      res.status('201').json(data)
    })
  } else {
    res.status(200)
  }
}

const convertToMarkdown = async (file, author, title, excerpt, topic) => {
  const wordsApi = new WordsApi(process.env.APOSE_KEY1, process.env.APOSE_KEY2)

  const requestDocument = fs.readFileSync(file.filepath)

  const convertRequest = new ConvertDocumentRequest({
    document: requestDocument,
    format: 'md',
  })

  const convertedFile = await wordsApi.convertDocument(convertRequest)

  return {
    file: convertedFile.body,
    author: author,
    title: title,
    excerpt: excerpt,
    topic: topic,
  }

  // .then((convertRequestResult) => {
  // console.log(convertRequestResult.body)
  // res.json({
  //     file: convertRequestResult.body,
  //     author: author,
  //     title: title,
  //     excerpt: excerpt,
  //     topic: topic,
  //   })
  //   saveFile(
  //       convertRequestResult.body,
  //       author,
  //       thumbnail,
  //       title,
  //       excerpt,
  //       topic
  //     )
  // })

  // return {
  //   file: convertRequestResult.body,
  //   author: author,
  //   title: title,
  //   excerpt: excerpt,
  //   topic: topic,
  // }
}

const saveFile = async (file, author, title, excerpt, topic) => {
  console.log('Saving File')
  fetch(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/addPost'
      : 'https://academic-cms.vercel.app/api/addPost',
    {
      method: 'POST',
      body: JSON.stringify({ file, author, title, excerpt, topic }),
    }
  )
}

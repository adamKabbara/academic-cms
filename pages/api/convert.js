import { WordsApi } from 'asposewordscloud'
import {
  UploadFileRequest,
  SaveAsRequest,
  PdfSaveOptionsData,
  ConvertDocumentRequest,
} from 'asposewordscloud'
import * as fs from 'fs'

import path from 'path'
export default function handler(req, res) {
  const wordsApi = new WordsApi(
    'af80956f-7ce5-4f2e-a273-b1ca72654d9b',
    '09de9df66660ec7e361903022078e08d'
  )

  const requestDocument = fs.createReadStream(
    path.join(__dirname, '../../../../files/cms-test.docx')
  )
  const convertRequest = new ConvertDocumentRequest({
    document: requestDocument,
    format: 'md',
  })

  wordsApi.convertDocument(convertRequest).then((convertRequestResult) => {
    // tslint:disable-next-line:no-console
    console.log(convertRequest)
    fs.writeFileSync('test.md', convertRequestResult.body)
  })
  // const uploadRequest = new UploadFileRequest()
  // uploadRequest.path = 'cms-test.docx'
  // uploadRequest.fileContent = createReadStream(
  //   path.join(__dirname, '../../../../files/cms-test.docx')
  // )

  // wordsApi.uploadFile(uploadRequest).then((_uploadResult) => {
  //   // save the file as pdf in the cloud
  //   const request = new SaveAsRequest({
  //     name: 'cms-test.docx',
  //     saveOptionsData: new PdfSaveOptionsData({
  //       fileName: 'destination.pdf',
  //     }),
  //   })

  //   wordsApi
  //     .saveAs(request)
  //     .then((_result) => {
  //       console.log(_result)
  //       // deal with the pdf file
  //     })
  //     .catch(function (_err) {
  //       // handle saveAs request error
  //     })
  // })
  // .catch(function (_err) {
  //   // handle uploadFile request error
  // })

  res.status(200).json({ name: 'John Doe' })
}

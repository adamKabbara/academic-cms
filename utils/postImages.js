import * as fs from 'fs'
import fetch from 'node-fetch'

const FormData = require('form-data')
const postImages = async (fileBuffer, fileName) => {
  const headers = new Headers()
  headers.append(
    'Authorization',
    'Basic cHJpdmF0ZV9FZW5qVnhnMUw5MWRZRW1UdTY2SzY3K3M1Rm89Og=='
  )
  headers.append('Connection', 'keep-alive')
  headers.append('Accept', '*/*')
  headers.append('Accept-Encoding', 'gzip, deflate, br')

  const data = new FormData()

  data.append('file', fileBuffer)
  data.append('fileName', fileName)

  const res = await fetch(`https://upload.imagekit.io/api/v1/files/upload`, {
    headers: headers,
    method: 'POST',
    body: data,
  })
  return res
}

export default postImages

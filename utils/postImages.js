import * as fs from 'fs'
const postImages = async (fileBuffer, fileName) => {
  const headers = new Headers()
  headers.append(
    'Authorization',
    'Basic cHJpdmF0ZV9FZW5qVnhnMUw5MWRZRW1UdTY2SzY3K3M1Rm89Og=='
  )
  // headers.append('Content-Type', 'multipart/form-data')
  headers.append('Connection', 'keep-alive')
  headers.append('Accept', '*/*')
  headers.append('Accept-Encoding', 'gzip, deflate, br')

  const data = new FormData()

  data.append('file', fileBuffer)
  data.append('fileName', fileName)

  const res = await fetch(`https://api.imagekit.io/v1/files/upload`, {
    headers: headers,
    method: 'POST',
    body: data,
  })
  return res
}

export default postImages

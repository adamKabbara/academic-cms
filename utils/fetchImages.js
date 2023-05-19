const fetchImages = async (name) => {
  const headers = new Headers()
  headers.append(
    'Authorization',
    'Basic cHJpdmF0ZV9FZW5qVnhnMUw5MWRZRW1UdTY2SzY3K3M1Rm89Og=='
  )
  console.log(name)
  let images = await fetch(`https://api.imagekit.io/v1/files`, {
    headers: headers,
  }).then((res) => res.json())

  const imagesMap = {}
  images.forEach((image) => {
    const imageName = image.name.split('_')[0]

    imagesMap[imageName] = image.url
  })
  return imagesMap
}

export default fetchImages

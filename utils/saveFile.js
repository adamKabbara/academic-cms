const saveFile = async (file, author, title, excerpt, topic) => {
  console.log('Saving File')
  await fetch(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/addPost'
      : 'https://academic-cms.vercel.app/api/addPost',
    {
      method: 'POST',
      body: JSON.stringify({
        file: file,
        author: author,
        title: title,
        excerpt: excerpt,
        topic: topic,
      }),
    }
  )
}
export default saveFile

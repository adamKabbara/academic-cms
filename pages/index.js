import matter from 'gray-matter'
import Post from '../components/Post'
import Footer from '../components/Footer'
import { useState } from 'react'
import fetchImages from '../utils/fetchImages'
import createMeta from '../utils/createMeta'

import fetchFiles from '../utils/fetchFiles'
export default function Home({ posts }) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div>
      <div id="main-content" className="">
        <h1 className="text-2xl pb-5 pt-2  font-bold m-auto">
          Latest Research
        </h1>
        <hr className="pb-5 w-96 m-auto" />
        <div className="posts">
          {posts.map((post, index) => {
            return <Post post={post} key={post.frontmatter.title} />
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // const fetchImages = async () => {
  //   const headers = new Headers()
  //   headers.append(
  //     'Authorization',
  //     'Basic cHJpdmF0ZV9FZW5qVnhnMUw5MWRZRW1UdTY2SzY3K3M1Rm89Og=='
  //   )
  //   let images = await fetch('https://api.imagekit.io/v1/files', {
  //     headers: headers,
  //   }).then((res) => res.json())

  //   const imagesMap = {}
  //   images.forEach((image) => {
  //     const imageName = image.name.split('.')[0]

  //     imagesMap[imageName] = image.url
  //   })
  //   return imagesMap
  // }

  const thumb = await fetchImages()

  // const client = await connectDB()

  // const send = await client
  //   .db('Project0')
  //   .collection('posts')
  //   .find({})
  //   .toArray()

  const send = await fetchFiles()

  const posts2 = send.map((post) => {
    const slug = post.title

    const thumbnailUrl = thumb[post.title]

    console.log(thumbnailUrl)

    const meta = createMeta(
      post.title,
      post.date,
      thumbnailUrl,
      post.excerpt,
      post.file
    )
    // const meta = `---\ntitle: ${post.title}\ndate: '${post.date}'\nthumbnail: ${thumbnailUrl}\nexcerpt: ${post.excerpt}\n---\n${post.file}`

    const { data: frontmatter } = matter(meta)
    return {
      slug,
      frontmatter,
      meta,
    }
  })

  // posts2.forEach((post) => fs.writeFileSync('../posts/' + post.slug, posts.))

  // const files = fs.readdirSync(path.join('posts'))
  // const posts = files.map((filename) => {
  //   const slug = filename.replace('.md', '')
  //   const meta = fs.readFileSync(path.join('posts', filename), 'utf-8')
  //   const { data: frontmatter } = matter(meta)

  //   return {
  //     slug,
  //     frontmatter,
  //     meta,
  //   }
  // })

  return {
    props: {
      posts: posts2,
    },
  }
}

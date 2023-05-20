import matter from 'gray-matter'
import Post from '../components/Post'
import Footer from '../components/Footer'
import { useState } from 'react'
import fetchImages from '../utils/fetchImages'
import createMeta from '../utils/createMeta'
import { useEffect } from 'react'

import fetchFiles from '../utils/fetchFiles'
export default function Home({ posts }) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const [isSearch, setIssearch] = useState(false)

  const [searchFilter, setSearchFilter] = useState()
  useEffect(() => {
    setSearchFilter(new URLSearchParams(window.location.search).get('title'))
    console.log('this is run')
  }, [])

  posts = posts.filter((post) => {
    return searchFilter ? post.frontmatter.title == searchFilter : true
  })

  return (
    <div>
      <div id="main-content" className="">
        <h1 className="text-2xl pb-5 pt-2  font-bold m-auto">
          {isSearch ? 'Search Results for:' : 'Latest Research'}
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
  const thumbnailList = await fetchImages()

  const send = await fetchFiles()

  const posts2 = send.map((post) => {
    const slug = post.title

    const thumbnailUrl = thumbnailList[post.title.replace(/\s/g, '')]

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

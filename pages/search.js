import matter from 'gray-matter'
import Post from '../components/Post'
import Footer from '../components/Footer'
import { useState } from 'react'
import fetchImages from '../utils/fetchImages'
import createMeta from '../utils/createMeta'
import { useEffect } from 'react'
import MiniSearch from 'minisearch'

import fetchFiles from '../utils/fetchFiles'
export default function Home({ posts }) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const [searchFilter, setSearchFilter] = useState('')
  useEffect(() => {
    setSearchFilter(new URLSearchParams(window.location.search).get('title'))
  }, [])

  let i = 0
  posts.map((post) => {
    post.id = i
    i++
  })

  const miniSearch = new MiniSearch({
    fields: ['slug'],
    storeFields: ['frontmatter', 'meta'],
  })

  miniSearch.addAll(posts)

  const results = miniSearch.search(searchFilter)

  return (
    <div>
      <div id="main-content" className="">
        <h1 className="text-2xl pb-5 pt-2  font-bold m-auto">
          Latest Research
        </h1>
        <hr className="pb-5 w-96 m-auto" />
        <div className="posts">
          {results.map((post, index) => {
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

    const { data: frontmatter } = matter(meta)
    return {
      slug,
      frontmatter,
      meta,
    }
  })

  return {
    props: {
      posts: posts2,
    },
  }
}

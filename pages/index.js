import Head from 'next/head'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Post from '../components/Post'

export default function Home({ posts }) {
  return (
    <div>
      <Head></Head>

      <div id="main-content">
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
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const meta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const { data: frontmatter } = matter(meta)

    return {
      slug,
      frontmatter,
    }
  })
  console.log(posts)
  return {
    props: {
      posts: posts,
    },
  }
}

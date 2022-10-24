import Head from 'next/head'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export default function Home({ posts }) {
  return (
    <div>
      <Head></Head>
      <div className="posts">
        {posts.map((post, ind) => {
          return <h3 key={ind}>{post.frontmatter.title}</h3>
        })}
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

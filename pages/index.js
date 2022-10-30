import Head from 'next/head'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Post from '../components/Post'
import Footer from '../components/Footer'

export default function Home({ posts }) {
  return (
    <div>
      <Head></Head>

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
  return {
    props: {
      posts: posts,
    },
  }
}

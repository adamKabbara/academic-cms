import Head from 'next/head'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Post from '../components/Post'
import Footer from '../components/Footer'
import { useState } from 'react'
// import getPosts from './api/getPosts'
import connectDB from '../utils/connectDB'

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
  const client = await connectDB()

  const send = await client
    .db('Project0')
    .collection('posts')
    .find({})
    .toArray()

  const posts2 = send.map((post) => {
    const slug = post.title

    const meta = `---\ntitle: ${post.title}\ndate: '${
      post.date
    }'\nthumbnail: /images/${post.title.replace(/\s/g, '')}.jpg\nexcerpt: ${
      post.excerpt
    }\n---\n${post.file}`

    const { data: frontmatter } = matter(meta)
    return {
      slug,
      frontmatter,
      meta,
    }
  })

  // ---
  // title: Cosmological simulations and machine learning
  // date: 'June 5, 2022'
  // thumbnail: /images/image1.jpg
  // excerpt: It was a simple tip of the hat. Grace didn't think that anyone else besides her had even noticed it.
  // ---

  // posts2.forEach((post) => fs.writeFileSync('../posts/' + post.slug, posts.))

  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const meta = fs.readFileSync(path.join('posts', filename), 'utf-8')
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

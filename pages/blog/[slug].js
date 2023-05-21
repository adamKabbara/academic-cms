/* eslint-disable @next/next/no-img-element */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { useAuth0 } from '@auth0/auth0-react'
import connectDB from '../../utils/connectDB'
import createMeta from '../../utils/createMeta'
import { create } from 'domain'
import fetchImages from '../../utils/fetchImages'
import { useEffect } from 'react'

export default function PostPage({
  frontmatter: { title, date, thumbnail },
  slug,
  content,
}) {
  const { isAuthenticated } = useAuth0()

  return (
    <>
      <div className="p-5 pt-1" id="slug-main-container">
        <h1 className="text-4xl" id="post-title">
          {title}
        </h1>
        <div className=" leading-9 text-slate-500 text-lg">Created {date}</div>
        <img
          src={thumbnail}
          alt="topic picture"
          className="m-auto  object-cover pt-10 pb-10  topic-image"
        />
        <div
          style={{ width: '100%' }}
          className="prose-base prose-h1:text-3xl prose-headings:text-white prose-p:text-white prose-li:text-white prose-a:text-white prose-strong:text-white  prose-headings max-w-none"
          id="main"
        >
          <div
            style={{ width: '100%' }}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const client = await connectDB()

  const posts = await client
    .db('Project0')
    .collection('posts')
    .find({})
    .toArray()

  const paths = posts.map((post) => ({
    params: {
      slug: '' + post.title,
      title: post.title,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const client = await connectDB()

  const thumbnail = await fetchImages()

  console.log('thum ', /* thumbnail[slug.replace(/\s/g, '')] */ thumbnail)

  const posts = await client
    .db('Project0')
    .collection('posts')
    .find({ title: slug })
    .toArray()
  const post = posts[0]

  const { data: frontmatter, content } = matter(
    createMeta(
      post.title,
      post.date,
      thumbnail[slug.replace(/\s/g, '')],
      post.excerpt,
      post.file
    )
  )

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}

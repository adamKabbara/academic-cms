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

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share'

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

        <div className="flex flex-col items-end">
          <p className="mb-2 block text-slate-400">Share Research:</p>
          <div className="flex space-x-1">
            <button className="pr-1" onClick={() => window.print()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                fill="currentColor"
                class="bi bi-download"
                viewBox="0 0 16 16"
              >
                {' '}
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />{' '}
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />{' '}
              </svg>
            </button>
            <FacebookShareButton
              url={'https://academic-cms.vercel.app/'}
              title={'Check out this research paper: '}
              quote={'Check out this research paper: '}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <PinterestShareButton
              url={'https://academic-cms.vercel.app/'}
              title={'Check out this research paper: '}
              quote={'Check out this research paper: '}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
            <RedditShareButton
              url={'https://academic-cms.vercel.app/'}
              title={'Check out this research paper: '}
              quote={'Check out this research paper: '}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>
            <WhatsappShareButton
              url={'https://academic-cms.vercel.app/'}
              title={'Check out this research paper: '}
              quote={'Check out this research paper: '}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={'https://academic-cms.vercel.app/'}
              title={'Check out this research paper: '}
              quote={'Check out this research paper: '}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </div>
        <img
          src={thumbnail}
          alt="topic picture"
          className="m-auto  object-cover pt-8 pb-10  topic-image"
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

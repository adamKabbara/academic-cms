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
import { useEffect, useRef } from 'react'
import Post from '../../components/Post'

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
  recommended,
  author,
}) {
  const { isAuthenticated } = useAuth0()
  const contentDiv = useRef('')
  /*
  # Succedere conplexi humi undis volenti occuluit serpens

## Quas Argolicas sine

Lorem markdownum et memor fuit talia veteris de turbae exosus _tempora Oriente_
gemitus transferre Lycisce dedit terraeque, pro furit? Cum illis populi geri
palluit, videt avellere tormenta silvis at ante retexi carminaque alterius
mensis [iussus](http://fraternorevertitur.com/invergens.html)? Ex gaudeat
vestigia, huc in greges; capitis fuit. **Patareaque** bello, nec nardi quicquam
anxia cognoscere quid _est nosterque_ tamen.
  */
  // console.log(content)
  // const html = `<h1 id="succedere-conplexi-humi-undis-volenti-occuluit-serpens">Succedere conplexi humi undis volenti occuluit serpens</h1><h2 id="quas-argolicas-sine">Quas Argolicas sine</h2>`

  // const translate = async () => {
  //   const html = contentDiv.current.innerHTML.replace(/(\r\n|\n|\r)/gm, '')

  //    const url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyBECzcLnTcRVItov_FennhVlNvCRgil9mw&target=en&format=html&q=${html}`

  //   fetch(url, {
  //     method: 'POST',
  //     headers: {},
  //   }).then((res) =>
  //     res
  //       .json()
  //       .then(
  //         (data) =>
  //           (contentDiv.current.innerHTML =
  //             data.data.translations[0].translatedText)
  //       )
  //   )
  // }

  // useEffect(() => {
  // translate()
  // }, [])

  return (
    <>
      <div className="p-5 pt-1" id="slug-main-container">
        <h1 className="text-4xl" id="post-title">
          {title}
        </h1>

        <div className=" leading-9 text-slate-500 text-lg">Created {date}</div>
        <div className=" leading-9 text-slate-500 text-lg">{author}</div>

        <div className="flex flex-col items-end">
          <p className="mb-2 block text-slate-400">Share Research:</p>
          <div className="flex space-x-1">
            <button className="pr-1" onClick={() => window.print()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                fill="currentColor"
                className="bi bi-download"
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
            ref={contentDiv}
            style={{ width: '100%' }}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
          ></div>
          <div id="recommended" className="pt-20">
            <hr className="m-auto pb-10"></hr>
            <h2>Recommended Readings</h2>
            <div className="posts">
              {recommended.map((post, index) => {
                return <Post post={post} key={recommended.title} />
              })}
            </div>
          </div>
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
  // const post = posts[0]

  const posts2 = await client
    .db('Project0')
    .collection('posts')
    .find({})
    .toArray()

  const post = posts2.filter((post) => post.title === slug)[0]

  const recommended = posts2.filter(
    (el) => el.title != slug && el.topic === post.topic
  )

  recommended.forEach((el) => {
    el['_id'] = null
    // el.thumbnail = thumbnail[el.title.replace(/\s/g, '')]
    el.frontmatter = {}
    el.frontmatter.thumbnail =
      thumbnail[el.title.replace(/\s/g, '')] === undefined
        ? ''
        : thumbnail[el.title.replace(/\s/g, '')]
    el.frontmatter.title = el.title
    el.slug = el.title
    el.frontmatter.date = el.date
    el.frontmatter.excerpt = el.excerpt
  })
  const author = post.author

  const { data: frontmatter, content } = matter(
    createMeta(
      post.title,
      post.date,
      thumbnail[slug.replace(/\s/g, '')] === undefined
        ? ''
        : thumbnail[slug.replace(/\s/g, '')],
      post.excerpt,
      post.file,
      post.author
    )
  )

  return {
    props: {
      frontmatter,
      slug,
      content,
      recommended,
      author,
    },
    revalidate: 1,
  }
}

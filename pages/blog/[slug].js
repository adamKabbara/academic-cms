import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'

export default function PostPage({
  frontmatter: { title, date, thumbnail },
  slug,
  content,
}) {
  return (
    <>
      <div className="p-5 pt-1" id="slug-main-container">
        <h1 className="text-4xl" id="post-title">
          {title}
        </h1>
        <div className=" leading-9 text-slate-500 text-lg">{date}</div>
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

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}

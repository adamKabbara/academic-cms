import React from 'react'
import Link from 'next/link'

export default function Post({ post }) {
  return (
    <>
      <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-2.5">
        <Link href={`/blog/${post.slug}`}>
          <a>
            <img
              className="thumbnail"
              src={'/academic-cms' + post.frontmatter.thumbnail}
              alt="thumbnail"
            />
          </a>
        </Link>
        <div className="p-4">
          <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Created {post.frontmatter.title}
            </h5>
          </a>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {post.frontmatter.excerpt}
          </p>
          <div className="flex justify-between">
            <Link href={`/blog/${post.slug}`}>
              <a
                href="#"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  aria-hidden="true"
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </Link>
            <p className="leading-9 text-slate-500">
              Created {post.frontmatter.date}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

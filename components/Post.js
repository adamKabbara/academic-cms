import React from 'react'
import Link from 'next/Link'

export default function Post({ post }) {
  return (
    <>
      <img
        className="thumbnail"
        src={post.frontmatter.thumbnail}
        alt="thumbnail"
      />
    </>
  )
}

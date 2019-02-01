import React from 'react'
import { Link, graphql } from 'gatsby'

import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'

import Helmet from 'react-helmet'
// import _ from 'lodash'

import Header from '../components/Header'

import BlogList from '../components/BlogList'

import './all.scss'

const Posts = (props) => {
  const posts = props.posts
  return (
    posts.map(node => {
      const post = node.node
      const title = get(post, 'frontmatter.title') || post.fields.slug
      const slug = post.fields.slug
      return (
          <BlogList key={slug} postTitle={title} postSlug={slug} postDate={post.frontmatter.date} />
      )
    })
  )
}

const PostsGroupedByYear = (props) => {
  const posts = props.posts
  const groupedPosts = groupBy(posts, post => {
    return post.node.frontmatter.date.slice(-4)
  });

  return (
    Object.keys(groupedPosts).sort((a, b) => (b - a)).map(function (key, index) {
      const yearPosts = groupedPosts[key]
      const sortedPosts = sortBy(yearPosts, function(o) { var dt = new Date(o.node.frontmatter.date); return -dt; })
      return (
        <div key={index} className='is-blog-year'>
          <Posts posts={sortedPosts} />
        </div>
      )
    })
  )
}

class BlogIndex extends React.Component {
  render() {
    const title = get(this, 'props.data.site.siteMetadata.title') + " | Blog"
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    const markdownPosts = get(this, 'props.data.allMarkdownRemark.edges')
    const mdxPosts = get(this, 'props.data.allMdx.edges')

    let posts = markdownPosts.concat(mdxPosts)
  
    posts = sortBy(posts, [function(o) { return o.node.fields.sortDate; }] ).reverse()

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={title}
        />
        <Header />
        <section className='section has-no-top-padding'>
          <div className='container'>
            <div className='content'>
              <p>Here are the words I've attempted to arrange into an original, and interesting order. Enjoy 😄</p>
              <PostsGroupedByYear posts={posts} />
              {/* <Posts posts={posts} /> */}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
      description
    }
  }
  allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        excerpt
        fields {
          slug
          sortDate
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
        }
      }
    }
  }
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        excerpt
        fields {
          slug
          sortDate
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
        }
      }
    }
  }
}
`

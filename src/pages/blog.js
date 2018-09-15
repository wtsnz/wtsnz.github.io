import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Header from '../components/Header'

import BlogList from '../components/BlogList'

import './all.scss'

class BlogIndex extends React.Component {
  render() {
    const title = get(this, 'props.data.site.siteMetadata.title') + " | Blog"
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMdx.edges')

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

              {posts.map(({ node }) => {
                const title = get(node, 'frontmatter.title') || node.fields.slug
                const slug = node.fields.slug
                return (
                  <BlogList key={slug} postTitle={title} postSlug={slug} postDate={node.frontmatter.date} />
                )

              })}

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
    allMdx(sort: {fields: [frontmatter___date], order: DESC }) {
          edges {
        node {
          excerpt
          fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY")
        title
      }
    }
  }
}
}
`

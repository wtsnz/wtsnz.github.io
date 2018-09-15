import Helmet from 'react-helmet'
import get from 'lodash/get'
import Header from '../components/Header'
import Bio from '../components/Bio'
import { Link } from 'gatsby'
import React from 'react'
import { graphql } from 'gatsby'

import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXTag, MDXProvider } from '@mdx-js/tag'

import '../pages/all.scss'
require('../css/prism-duotone-space.css');
require('../css/prism-fix-bulma.css');

class MdxBlogPostTemplate extends React.Component {
  render() {
    const { children, __mdxScope, data, ...props } = this.props

    const post = this.props.data.mdx
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <div>

        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />

        <Header />

        <section className='section has-no-top-padding'>
          <div className='container'>
            <div className='content'>
              <h1 className="title">{post.frontmatter.title}</h1>
              <p className="subtitle post-date">{post.frontmatter.date}</p>

              <MDXRenderer {...props} scope={{ React, MDXTag, ...__mdxScope }}>
                {data.mdx.code.body}
              </MDXRenderer>

              </div>
          </div>
        </section>
        <section className='section'>
          <div className='container'>
            <div className='content'>
              <Bio />

              <ul
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  listStyle: 'none',
                  padding: 0,
                }}
              >
                {previous && (
                  <li>
                    <Link to={previous.fields.slug} rel="prev">
                      ← {previous.frontmatter.title}
                    </Link>
                  </li>
                )}

                {next && (
                  <li>
                    <Link to={next.fields.slug} rel="next">
                      {next.frontmatter.title} →
      </Link>
                  </li>
                )}
              </ul>

            </div>
          </div>
        </section>
      </div>

    )
  }
}

export default MdxBlogPostTemplate


export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      code {
        body
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

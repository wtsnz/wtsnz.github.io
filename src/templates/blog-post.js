import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'

import Header from '../components/Header'

import '../pages/all.scss'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
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

        <section className='section'>
          <div className='container'>
            <div className='content'>
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.date}</p>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`

import Helmet from 'react-helmet'
import get from 'lodash/get'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Bio from '../components/Bio'
import { Link } from 'gatsby'
import React from 'react'
import { graphql } from 'gatsby'

import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXTag, MDXProvider } from '@mdx-js/tag'

class MdxBlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      instagram: false,
    }
  }

  componentDidMount() {
    // Check for Instagram script
    if (window.instgrm && document.getElementById('react-instagram-embed-script') && this.state.instagram == false) {
      window.instgrm.Embeds.process()
    } else {
      // Create script element with Instagram embed JS lib
      const s = document.createElement('script')
      s.async = s.defer = true
      s.src = `//www.instagram.com/embed.js`
      s.id = 'react-instagram-embed-script'
      const body = document.body
      if (body) {
        body.appendChild(s)
      }

      // Run Instagram function to show embeds
      if (window.instgrm && this.state.instagram == false) {
        window.instgrm.Embeds.process()
      }

      // Set IG state to true so the process doesn't run again
      this.setState({
        instagram: true,
      })
    }
  }

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

        <section>
          <div className='mx-auto max-w-4xl px-4 pt-12'>
            <div className='prose max-w-none max-w-2xl'>
              <div className='blog-post-header has-large-bottom-padding'>
                {/* <p className=' has-text-grey blog-post-header-date has-text-centered is-marginless' >{post.frontmatter.date}</p> */}
                <div className='mb-2 text-sm text-tertiary tracking-normal' >{post.frontmatter.date}</div>

                <h1 className='blog-post-title has-text-centered is-marginless'>{post.frontmatter.title}</h1>
              </div>
              <MDXRenderer scope={this.props.__mdxScope}>
                  {post.body}
                </MDXRenderer>
            </div>
          </div>

        </section>

        <Footer />
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
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

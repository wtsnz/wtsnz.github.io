import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import get from 'lodash/get'

import { graphql } from 'gatsby'

import Bio from '../components/Bio'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Container from '../components/layout/Container'

require('../css/prism-duotone-space.css');
require('../css/prism-fix-bulma.css');

class BlogPostTemplate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            instagram: false,
        }
    }

    componentDidMount() {
        // Check for Instagram script
        // if (window.instgrm && document.getElementById('react-instagram-embed-script') && this.state.instagram == false) {
        //   window.instgrm.Embeds.process()
        // } else {
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
        // }
    }

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

                <section>
                    <div className='mx-auto max-w-4xl px-4 pt-12'>
                        <div className='max-w-prose'>
                            <div>
                                <h1 className='text-4xl font-semibold'>{post.frontmatter.title}</h1>
                                <div className='text-gray-600 mb-2 text-sm text-tertiary tracking-normal' >{post.frontmatter.date}</div>
                            </div>
                            <div className="prose ">
                                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                            </div>
                        </div>
                    </div>

                </section>

                <Footer />
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

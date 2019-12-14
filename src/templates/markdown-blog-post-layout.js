import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import get from 'lodash/get'

import { graphql } from 'gatsby'

import Bio from '../components/Bio'

import Header from '../components/Header'

import '../pages/all.scss'

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

                <section className='section'>
                    <div className='container'>
                        <div className='content'>
                            <div className='blog-post-header has-large-bottom-padding'>
                                <p className=' has-text-grey blog-post-header-date has-text-centered is-marginless' >{post.frontmatter.date}</p>
                                <h1 className='blog-post-title has-text-centered is-marginless'>{post.frontmatter.title}</h1>
                            </div>
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

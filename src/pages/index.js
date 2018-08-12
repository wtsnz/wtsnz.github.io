import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

import BlogList from '../components/BlogList'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />

        <p>I’m a iOS software engineer from New Zealand. I create software for the Apple devices that live on your wrist, your pocket and under your tv using Swift and Objective-C. I adore clean code, beautiful design and a perfectly brewed cup of tea ☕️.</p>
        <p>You can checkout my github profile for things I’m working on, my instagram profile for photos that I take, and my twitter profile for whatever I feel like retweeting on a given day.</p>

        <h1>Writing</h1>

        <p>I like to sporadically write the occasional thing on my blog. Here’s my latest posts.</p>

          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            const slug = node.fields.slug
            return (
              <BlogList key={slug} postTitle={title} postSlug={slug} postDate={node.frontmatter.date} />
            )

          })}

          <h1>Personal Projects</h1>

          <p>My product journey so far has been extremely educational. There’s so much more to consider than a few lines of code!</p>
          <p>I’ve created a few apps on my own, with the most successful personal project of mine Tides NZ, has been a great success and has enjoyed being the #1 Navigation app in New Zealand since it’s release in May 2011! 500+ ratings with an average of 4.8, not bad!</p>
      </Layout>
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
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC }) {
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

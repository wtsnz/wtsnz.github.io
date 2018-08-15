import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header'

import '../pages/all.scss'

export default class PageLayout extends React.Component {
  render() {
    const { children, location } = this.props;
    return (
      <div>
        <Header />

        <section className='section has-no-top-padding'>
          <div className='container'>
            <div className='content'>
            {children}
            </div>
          </div>
        </section>
      </div>

    )
  }
}

// export default BlogPostTemplate

// export default class PageLayout extends React.Component {
//     render() {
//       const { children, location } = this.props;
//       return (
//         <Layout location={this.props.location}>
//             {children}
//         </Layout>
//       );
//     }
//   }

// class MDXBlogPostTemplate extends React.Component {
//   render() {
//     const post = this.props.data.markdownRemark
//     const siteTitle = get(this.props, 'data.site.siteMetadata.title')
//     const siteDescription = post.excerpt
//     const { previous, next } = this.props.pageContext

//     return (
//       <Layout location={this.props.location}>

//       </Layout>
//     )
//   }
// }

// export default MDXBlogPostTemplate

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//       }
//     }
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       id
//       excerpt
//       html
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//       }
//     }
//   }
// `

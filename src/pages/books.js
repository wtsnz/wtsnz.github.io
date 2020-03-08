import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import get from 'lodash/get'

import Helmet from 'react-helmet'
import Header from '../components/Header'
import { Books } from '../components/Books'

import './all.scss'

class BlogIndex extends React.Component {
    render() {
        const title = get(this, 'props.data.site.siteMetadata.title') + " | Books"
        const siteDescription = get(
            this,
            'props.data.site.siteMetadata.description'
        )

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
                            <p>Here are some books that I've read and enjoyed.</p>
                        </div>
                        <Books />
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
}
`

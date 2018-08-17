import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Header from '../components/Header'

import BlogList from '../components/BlogList'
import Project from '../components/Project'

import './all.scss'

import iconOBS from '../assets/obs-camera-cource-app-icon.svg'
import iconTidesNZ from '../assets/icon_tides_nz.png'
import iconSales from '../assets/icon_sales.png'
import iconRoadCodeNZ from '../assets/icon-road-code-nz.png'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (

      <div>

        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />

        <Header />

        <section className='section has-no-top-padding'>
          <div className='container'>

            <div className='content'>
              <p>I’m a <strong>iOS software engineer</strong> from New Zealand. I create <a href="https://github.com/wtsnz">software</a> for the Apple devices that live on your wrist, your pocket and under your tv using <strong>Swift</strong> <s>and Objective-C</s>. I adore <strong>clean code</strong>, <strong>beautiful design</strong> and a perfectly brewed <strong>cup of tea</strong> ☕️.</p>

              <p>You can checkout my <strong><a href="https://github.com/wtsnz">github</a></strong> profile for things I’m working on, my <strong><a href="https://www.instagram.com/wtsnz/">instagram</a></strong> profile for photos that I take, and my <strong><a href="https://twitter.com/wtsnz">twitter</a></strong> profile for whatever I feel like retweeting on a given day.</p>
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

            </div>

            <Project
              title="iPhone Camera Plugin for OBS Studio"
              subtitle="2018 - Current"
              image={iconOBS}
              description="I played around with the OBS Studio plugin API in C++ to write a plugin that allows you to stream high quality video from your iPhone's camera over USB."
              link="https://obs.camera/"
            />

            <Project
              title="Road Code NZ"
              subtitle="2017 - Current"
              image={iconRoadCodeNZ}
              description="Learn the New Zealand road code with this app. Me and my co-creator Waleeg decided to make this app so we could learn the motorcycle road code."
              link="https://itunes.apple.com/nz/app/road-code-license-nz/id1163987935?mt=8"
            />

            <Project
              title="Tides NZ"
              subtitle="2011 - Current"
              image={iconTidesNZ}
              description="Tides NZ was the first iOS app I created. I got the idea through a summer of skim-boarding, which knowing what the tide was doing was essential for me and a few friends. Turns out that other people like to know what the tide is doing!"
              link="https://itunes.apple.com/nz/app/tides-nz/id521561961?mt=8"
            />



            <div className='content'>
              <h1>Experiments</h1>
              <p>Previous projects that aren't available in the AppStore.</p>
            </div>

            <Project
              title="Sales"
              subtitle="2014 - 2016"
              image={iconSales}
              description="After launching Tides NZ, I came across AppFigures. While they don't have a companion app, they do provide a public API for third parties to play with. Hence Sales was born."
            />

            <Project
              title="iPhone Camera Plugin for OBS Studio"
              subtitle="2018 - Current"
              image={iconOBS}
              description="I played around with the OBS Studio plugin API in C++ to write a plugin that allows you to stream high quality video from your iPhone's camera over USB."
              link="https://obs.camera/"
            />

            <Project
              title="iPhone Camera Plugin for OBS Studio"
              subtitle="2018 - Current"
              image={iconOBS}
              description="I played around with the OBS Studio plugin API in C++ to write a plugin that allows you to stream high quality video from your iPhone's camera over USB."
              link="https://obs.camera/"
            />

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
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC }, limit: 10) {
          edges {
        node {
          excerpt
          fields {
          slug
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

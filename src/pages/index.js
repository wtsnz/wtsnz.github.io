import React from 'react'
import { Link, graphql } from 'gatsby'

import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

import Helmet from 'react-helmet'

import Header from '../components/Header'
import Footer from '../components/Footer'

import BlogList from '../components/BlogList'
import Project from '../components/Project'

import "../css/tailwind.css"

// import './all.scss'

import iconOBS from '../assets/obs-camera-cource-app-icon.svg'
import iconTelecast from '../assets/icon_telecast.png'
import iconTidesNZ from '../assets/icon_tides_nz.png'
import iconSales from '../assets/icon_sales.png'
import iconRoadCodeNZ from '../assets/icon-road-code-nz.png'
import iconNZH from '../assets/icon-nzh.png'
import iconSwiftParticles from '../assets/icon-swift-particles.png'

import TextLoop from 'react-text-loop'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    const markdownPosts = get(this, 'props.data.allMarkdownRemark.edges')
    const mdxPosts = get(this, 'props.data.allMdx.edges')

    let posts = markdownPosts.concat(mdxPosts)

    posts = sortBy(posts, [
      function (o) {
        return o.node.fields.sortDate
      },
    ]).reverse()

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />

        <Header />

        <section class="bg-white dark:bg-gray-800">
          <div class="container mx-auto px-4 py-8 lg:max-w-3xl max-w-2xl">
            <div class="lg:flex items-center">
              <div class="lg:w-1/2">
                <h2 class="text-gray-800 dark:text-gray-100 text-3xl font-bold">Hello 👋, I'm Will</h2>
                <p class="mt-4">
                  I’m<span> </span>
                    <strong>a human being</strong>
                  <span> </span>from New Zealand 🇳🇿 living in Vancouver 🇨🇦.
                </p>
                <div>
                  <div class="flex items-center -mx-2 mt-6">
                    <a class="mx-2" href="https://twitter.com/wtsnz" aria-label="Twitter">
                      <svg class="fill-current text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
                      </svg>
                    </a>
                    <a class="mx-2" href="https://www.linkedin.com/in/wtsnz/" aria-label="Linkden">
                      <svg class="fill-current text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z" />
                      </svg>
                    </a>
                    <a class="mx-2" href="https://github.com/wtsnz" aria-label="Github">
                      <svg class="fill-current text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9 1.4.3 2.6.4 3.8.4 8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1-8.4 1.9-15.9 2.7-22.6 2.7-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1 10.5 0 20-3.4 25.6-6 2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8 0 0 1.6-.5 5-.5 8.1 0 26.4 3.1 56.6 24.1 17.9-5.1 37-7.6 56.1-7.7 19 .1 38.2 2.6 56.1 7.7 30.2-21 48.5-24.1 56.6-24.1 3.4 0 5 .5 5 .5 12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5 1.2 0 2.6-.1 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div class="mt-8 lg:mt-0 lg:w-1/2 hidden lg:block">
                <div class="flex items-center justify-center lg:justify-end">
                  <div class="max-w-lg">
                    <img class="w-full h-64 object-cover object-center rounded-md" src="https://pbs.twimg.com/profile_images/1312960802786222080/um2ZkT9f_400x400.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto px-4 lg:pt-16 max-w-2xl">
          <section className="has-no-top-padding">
            <div className="">

              <div className="prose max-w-none">

                <p>
                  I've created <a href="https://github.com/wtsnz">software</a>{' '}
                  for the Apple devices that live on your wrist, your pocket and
                  under your tv using <strong>Swift</strong>{' '}
                  <s>and Objective-C</s>. I love to <strong>learn</strong>. I
                  love to figure out how to write{' '}
                  <strong>clean, maintainable code</strong>. I love to work with{' '}
                  <strong>beautiful designs</strong>. And I love a perfectly
                  brewed <strong>cup of tea!</strong> ☕️
                </p>

                <p>
                  You can checkout my{' '}
                  <strong>
                    <a href="https://github.com/wtsnz">github</a>
                  </strong>{' '}
                  profile for things I’m working on, and my{' '}
                  <strong>
                    <a href="https://twitter.com/wtsnz">twitter</a>
                  </strong>{' '}
                  profile for whatever I feel like retweeting on a given day, or learn more <Link to="/about">about me</Link>.
                </p>

                <hr />

                <h1>Writing</h1>

                <p>
                  I like to sporadically write the occasional thing on my blog.
                  Here’s my latest posts.
                </p>

              </div>
              <div className="py-8">
                {posts.map(({ node }) => {
                  const title =
                    get(node, 'frontmatter.title') || node.fields.slug
                  const slug = node.fields.slug
                  return (
                    <BlogList
                      key={slug}
                      postTitle={title}
                      postSlug={slug}
                      postDate={node.frontmatter.date}
                    />
                  )
                })}
              </div>
              <div className="prose max-w-none">

                <hr />

                <h1>Personal Projects</h1>

                <p>
                  There's always a lot more to consider than code when it comes to digital products. The projects below have been a great way for me to experience, and be in charge of the full lifecycle of product development.
                </p>
                <p>
                  The project I'm most proud of was the app that started my App Store Career, Tides NZ. It has enjoyed being the #1 Navigation app in New Zealand since it’s release in May 2011. As far as I can tell its since saturated the NZ market of people looking for Tide Predictions, received 500+ ratings with an average rating of 4.8, and gave me a little bit of pocket money.
                </p>
              </div>

              <div className="py-8">
                <Project
                  title="Telecast Webcam for MacOS"
                  subtitle="2020 - Current"
                  image={iconTelecast}
                  description="Use your iPhone camera as a webcam. An extension to the Camera Plugin for OBS Studio. Windows coming soon."
                  link="https://telecast.camera/"
                />

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
                  description="Tides NZ was the first iOS app I created. I got the idea through a summer of skim-boarding, to which knowing what the tide was doing was essential for me and a few friends. Turns out that other people like to know what the tide is doing!"
                  link="https://itunes.apple.com/nz/app/tides-nz/id521561961?mt=8"
                />
              </div>

              <hr />

              <div className="prose max-w-none pt-8">
                <h1>Experiments</h1>
                <p>Older projects that aren't available on the App Store anymore, or projects that didn't result in something shippable.</p>
              </div>

              <div className="py-8">
                <Project
                  title="Sales"
                  subtitle="2014 - 2016 (Now retired from the App Store)"
                  image={iconSales}
                  description="After launching Tides NZ, I came across AppFigures. While they don't have a companion app, they do provide a public API for third parties to play with. Hence Sales was born."
                />

                <Project
                  title="Alternate NZ Herald Client"
                  subtitle="2014"
                  image={iconNZH}
                  description="I decided to reverse engineer the NZ Herald API and attempt to make a simple news client that replicates Medium's fantastic app (especially the scrolling)."
                  link="https://github.com/wtsnz/NZHerald"
                />

                <Project
                  title="Swift Particles"
                  subtitle="2015"
                  image={iconSwiftParticles}
                  description="I came across Sketch.js and a Particle demo. I quite liked it so spent an hour or so to implement (port js really..) something similar in Swift. It brought back memories of writing games in action script."
                  link="https://github.com/wtsnz/Swift-Particles"
                />
              </div>
            </div>
          </section>
        </div>

        <Footer />
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 10) {
      edges {
        node {
          excerpt
          fields {
            slug
            sortDate
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            sortDate
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

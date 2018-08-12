const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const moment = require('moment')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    fileSourceName
                  }
                  frontmatter {
                    title
                    layout
                    categories
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          // If the source is a post (from the posts directory)
          if (post.node.fields.fileSourceName == 'posts') {

            const slug = post.node.fields.slug

            createPage({
              path: slug,
              component: blogPost,
              context: {
                slug: slug,
                previous,
                next,
              },
            })

          } else {
            console.error("No template for markdown source: " + post.node.fields.fileSourceName)
          }
          
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // const fileNode = getNode(node.parent)
  // console.log(`\n`, fileNode.relativePath)

  if (node.internal.type === `MarkdownRemark`) {

    // console.log(node);

    // Get the parent file node
    const parent = getNode(node.parent)

    createNodeField({
      node,
      name: `fileSourceName`,
      value: parent.sourceInstanceName,
    })

    if (parent.sourceInstanceName === "posts") {

      let slug = createFilePath({ node, getNode})

      if (node.frontmatter.slug) {
        slug = node.frontmatter.slug
      }
  
      else if (node.frontmatter.date) {
        let date = moment(node.frontmatter.date)

        // Split file path by slashes, and select the last one
        slug = slug.split('/')
            .filter (string => string.length > 0)
            .last()

        // Remove slashes
        let nameArr = slug.replace(/\//g, "").split("-");
        // Remove the three entries as this is the date
        // the file name is something like `2013-13-28-post-title.md`
        nameArr.splice(0, 3).join("-");
        let title = nameArr.join("-")
                           .replace(".md", "") // Remove .md if there
                           .replace(/-+/g, '-'); // collapse dashes;
        slug = date.format("YYYY") + '/' + title
      }
  
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })

    } else {
      const slug = createFilePath({ node, getNode})
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })
    }
  }
}

if (!Array.prototype.last){
  Array.prototype.last = function(){
      return this[this.length - 1];
  };
};
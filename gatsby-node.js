const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const moment = require('moment')

const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/markdown-blog-post-layout.js')
    const mdxPost = path.resolve('./src/templates/mdx-blog-post-layout.js')
    resolve(
      graphql(
        `
          {
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  parent {
                    ... on File {
                      name
                      absolutePath
                      relativePath
                    }
                  }
                  code {
                    scope
                    body
                  }
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
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  parent {
                    ... on File {
                      name
                      absolutePath
                      relativePath
                    }
                  }
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

        // Create markdown blog posts pages.
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

        // Create blog posts pages.
        const mdxposts = result.data.allMdx.edges

        _.each(mdxposts, (post, index) => {
          const previous =
            index === mdxposts.length - 1 ? null : mdxposts[index + 1].node
          const next = index === 0 ? null : mdxposts[index - 1].node

          // console.log(post.node.code.scope)

          // If the source is a post (from the posts directory)
          if (post.node.fields.fileSourceName == 'posts') {

            createPage({
              path: post.node.fields.slug,
              component: mdxPost,
              context: {
                slug: post.node.fields.slug,
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

  if (node.internal.type === `MarkdownRemark`) {

        // Get the parent file node
    const parent = getNode(node.parent)

    createNodeField({
      node,
      name: `fileSourceName`,
      value: parent.sourceInstanceName,
    })

    if (parent.sourceInstanceName === "posts") {

      let slug = createFilePath({ node, getNode })

      if (node.frontmatter.slug) {
        slug = node.frontmatter.slug
      }

      else if (node.frontmatter.date) {
        let date = moment(node.frontmatter.date)

        // Split file path by slashes, and select the last one
        slug = slug.split('/')
          .filter(string => string.length > 0)
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

        createNodeField({
          node,
          name: `sortDate`,
          value: date.format('x'),
        })

      }

      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })

    } else {
      // console.log("PAGE")
      const slug = createFilePath({ node, getNode })
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })

      createNodeField({
        node,
        name: `sortDate`,
        value: '0',
      })
    }

  } else 

  if (node.internal.type === `Mdx`) {

    // console.log(node);
    // Get the parent file node
    const parent = getNode(node.parent)

    createNodeField({
      node,
      name: `fileSourceName`,
      value: parent.sourceInstanceName,
    })


    if (parent.sourceInstanceName === "posts") {

      
      let slug = createFilePath({ node, getNode })

      if (node.frontmatter.slug) {
        slug = node.frontmatter.slug
      }

      else if (node.frontmatter.date) {
        let date = moment(node.frontmatter.date)

        // Split file path by slashes, and select the last one
        slug = slug.split('/')
          .filter(string => string.length > 0)
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

        createNodeField({
          node,
          name: `sortDate`,
          value: date.format('x'),
        })
      }
      
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })

    } else {
      // console.log("PAGE")
      const slug = createFilePath({ node, getNode })
      createNodeField({
        node,
        name: `slug`,
        value: slug,
      })

      createNodeField({
        node,
        name: `sortDate`,
        value: '0',
      })
      
    }
  }


  // if (node.internal.type === `Mdx`) {
  //   const parent = getNode(node.parent);
  //   let value = parent.relativePath.replace(parent.ext, "");

  //   if (value === "index") {
  //     value = "";
  //   }

  //   createNodeField({
  //     node,
  //     name: `fileSourceName`,
  //     value: parent.sourceInstanceName,
  //   })

  //   // createNodeField({
  //   //   name: `slug`,
  //   //   node,
  //   //   value: `/${value}`
  //   // });

  //   createNodeField({
  //     name: "id",
  //     node,
  //     value: node.id
  //   });

  //   createNodeField({
  //     name: "title",
  //     node,
  //     value: node.frontmatter.title || startCase(parent.name)
  //   });
  // }
}

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
};


exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: { $components: path.resolve(__dirname, "src/components") }
    },
  })
}
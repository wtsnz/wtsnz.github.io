/**
 * Configuration for `gatsby-plugin-feed` equivalent to the default, but for MDX
 * instead of remark.
 *
 * Original default: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-feed/src/internals.js#L20
 * Usage: gatsby-config.js
 *
 * ```
 * const mdxFeed = require("gatsby-mdx/feed");
 *
 * module.exports = {
 *   plugins: [
 *     {
 *       resolve: `gatsby-plugin-feed`,
 *       options: mdxFeed
 *     }
 *   ]
 * };
 * ```
 *
 */

var _ = require('lodash');
let sortBy = _.sortBy;

module.exports = {
    /**
     * no need to specify the other options, since they will be merged with this
     */
    feeds: [
      {
        serialize: ({ query: { site, allMdx, allMarkdownRemark } }) => {

          // Join both of the markdown and MDX posts together

          const markdownPosts = allMdx.edges;
          const mdxPosts = allMarkdownRemark.edges;
      
          let posts = markdownPosts.concat(mdxPosts)
        
          posts = sortBy(posts, [function(o) { return o.node.fields.sortDate; }] ).reverse()

          return posts.map(post => {
            return {
              ...post.node.frontmatter,
              description: post.excerpt,
              url: site.siteMetadata.siteUrl + '/' + post.node.fields.slug,
              guid: site.siteMetadata.siteUrl + '/' + post.node.fields.slug
            };
          });
          
        },
        query: `
        {
          allMdx(
            limit: 1000,
            sort: {
              order: DESC,
              fields: [frontmatter___date]
            }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  date
                }
                fields {
                  slug
                }
                excerpt
              }
            }
          }
          allMarkdownRemark(
            sort: { 
              fields: [frontmatter___date], 
              order: DESC 
            }
            limit: 1000
          ) {
            edges {
              node {
                frontmatter {
                  title
                  date
                }
                fields {
                  slug
                }
                excerpt
              }
            }
          }
        }
      `,
        output: `feed.xml`
      }
    ]
  };
  
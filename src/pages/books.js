import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Img from "gatsby-image"
import styled from "styled-components"

import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import groupBy from 'lodash/groupBy'

import Helmet from 'react-helmet'

import Header from '../components/Header'

import BlogList from '../components/BlogList'

import './all.scss'
import books from '../content/books/books.json'

const Posts = (props) => {
    const posts = props.posts
    return (
        posts.map(node => {
            const post = node.node
            const title = get(post, 'frontmatter.title') || post.fields.slug
            const slug = post.fields.slug
            return (
                <BlogList key={slug} postTitle={title} postSlug={slug} postDate={post.frontmatter.date} />
            )
        })
    )
}

const PostsGroupedByYear = (props) => {
    const posts = props.posts
    const groupedPosts = groupBy(posts, post => {
        return post.node.frontmatter.date.slice(-4)
    });

    return (
        Object.keys(groupedPosts).sort((a, b) => (b - a)).map(function (key, index) {
            const yearPosts = groupedPosts[key]
            const sortedPosts = sortBy(yearPosts, function (o) { var dt = new Date(o.node.frontmatter.date); return -dt; })
            return (
                <div key={index} className='is-blog-year'>
                    <Posts posts={sortedPosts} />
                </div>
            )
        })
    )
}

const GridContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

    margin-left: -20% !important;
width: 140%;
`

const BookContainer = styled.section`
    padding 20px;
    cursor: pointer;
    transition: background 0.1s ease 0s;
    border-radius: 10px;

    &:hover {
        background-color: rgba(255, 118, 39, 0.06);
    }
`
import BookImage from '../components/BookImage'

const Book = (props) => {
    return (
        <BookContainer>
            <BookImage coverImageName={props.coverImageName} /> 
            <p class="has-text-weight-bold">{props.title}</p>
            <p class="is-6">by {props.author}</p>
            <p>{props.year}</p>
        </BookContainer>
    )
}

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

                        <GridContainer>

                            {books.books.map(book => {
                                return (
                                    <Book
                                        coverImageName={book.coverImageName}
                                        title={book.title}
                                        author={book.author}
                                        year={book.year}
                                    />
                                )
                            })}
                        </GridContainer>

                    </div>
                </section>
            </div>
        )
    }
}

export default BlogIndex

// export const pageQuery = graphql`
// query {
//   site {
//     siteMetadata {
//       title
//       description
//     }
//   }
//   allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
//     edges {
//       node {
//         excerpt
//         fields {
//           slug
//           sortDate
//         }
//         frontmatter {
//           date(formatString: "DD MMMM YYYY")
//           title
//         }
//       }
//     }
//   }
//   allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
//     edges {
//       node {
//         excerpt
//         fields {
//           slug
//           sortDate
//         }
//         frontmatter {
//           date(formatString: "DD MMMM YYYY")
//           title
//         }
//       }
//     }
//   }
// }
// `

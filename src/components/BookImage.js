///https://github.com/gatsbyjs/gatsby/issues/10482#issuecomment-485349612
import React, { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

const Image = ({ coverImageName, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile( filter: { sourceInstanceName: { eq: "books" } } ) {
        edges {
          node {
              name
            relativePath
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const match = useMemo(() => (
    data.allFile.edges.find(({ node }) => coverImageName === node.name)
  ), [ data, coverImageName ])

  return (
    <Img
      fluid={match.node.childImageSharp.fluid}
      {...props}
    />
  )
}

export default Image
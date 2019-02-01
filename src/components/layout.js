import React from 'react'
import { Link } from 'gatsby'

// import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            Will Townsend
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            Will Townsend
          </Link>
        </h3>
      )
    }
    return (
      <div
        className='section'
      >
        {header}
        {children}
      </div>
    )
  }
}

export default Template

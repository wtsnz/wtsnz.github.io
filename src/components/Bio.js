import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Will Townsend`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Hey 👋 I'm <strong>Will Townsend</strong>, I hope you enjoyed this post. If you have any questions you can contact me on {' '}
          <a href="https://mastodon.technology/@will">Mastodon</a> and maybe <a href="https://twitter.com/wtsnz">Twitter</a>, cheers!
        </p>
      </div>
    )
  }
}

export default Bio

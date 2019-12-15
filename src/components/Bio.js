import React from 'react'
import profilePic from './profile-pic.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: '20pt'
        }}
      >
        <img
          src={profilePic}
          alt={`Will Townsend`}
          style={{
            marginBottom: '0',
            width: '50pt',
            height: '50pt',
            marginRight: '20pt'
          }}
        />
        <p>
          Hey 👋 I'm <strong>Will Townsend</strong>, I hope you enjoyed this post. If you have any questions you can contact me on <a href="https://twitter.com/wtsnz">Twitter</a>, cheers!
        </p>
      </div>
    )
  }
}

export default Bio

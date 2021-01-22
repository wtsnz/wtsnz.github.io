import React from 'react'
import profilePic from './profile-pic.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div className="flex space-x-2 py-4">
        <img src={profilePic} className="w-16 h-16 self-center" />
        <div className="self-center">
          Hey 👋 I'm <strong>Will Townsend</strong>, I hope you enjoyed this post. If you have any questions you can contact me on <a className="font-medium underline" href="https://twitter.com/wtsnz">Twitter</a>, cheers!
        </div>
      </div>

    )
  }
}

export default Bio

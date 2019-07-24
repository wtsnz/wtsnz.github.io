import React from 'react'
import profilePic from './profile-pic.jpg'
let MoneyButton = require('@moneybutton/react-money-button').default

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
        <div
          style={{
            display: 'flex',
            marginBottom: '20pt',
            flexDirection: 'column'
          }}
        >
          <p>
            Hey 👋 I'm <strong>Will Townsend</strong>, I hope you enjoyed this post. If you have any questions you can contact me on {' '}
            <a href="https://mastodon.technology/@will">Mastodon</a> and maybe <a href="https://twitter.com/wtsnz">Twitter</a>, cheers!
        </p>
        <p>If this helped you out, feel free to tip me a dollar with money button!</p>
          <MoneyButton
            to='8350'
            amount='1'
            currency='USD'
            successMessage='Thanks so much! ❤️'
            label='Tip'
            type='tip'
          />
        </div>
      </div>
    )
  }
}

export default Bio

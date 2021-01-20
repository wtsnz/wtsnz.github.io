
import React, { Component } from "react";
import Link from 'gatsby-link'

class Footer extends Component {

  state = {
    isActive: false
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      <footer class='pt-24'>
        <div class="bg-gray-100">
          <div class="container mx-auto max-w-2xl lg:max-w-4xl py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class="text-xs tracking-wider self-center md:self-end">© 2021 Will Townsend — <a href="https://twitter.com/wtsnz" class="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@wtsnz</a>
            </p>
            <span class="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm"></span>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;

import React, { Component } from "react";
import Link from 'gatsby-link'
import { OutboundLink } from 'gatsby-plugin-google-analytics'


class Header extends Component {

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
      <div className="relative bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="relative z-10 bg-white lg:max-w-4xl lg:w-full">
            <div className="px-4 relative pt-6 pb-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex items-center flex-grow flex-shrink-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to="/">
                      <h1 className="font-bold text-2xl text-orange-500">Will Townsend</h1>
                    </Link>
                    <div className="flex items-center md:hidden">
                      <button onClick={this.toggleNav} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" id="main-menu" aria-haspopup="true">
                        <span className="sr-only">Open main menu</span>

                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-2 md:pr-4 md:space-x-2">
                  <Link to="/blog" className="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  activeClassName="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Blog</Link>
                  <Link to="/about" className="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  activeClassName="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">About</Link>
                </div>
              </nav>
            </div>

            {(() => {
              if (this.state.isActive) {
                return (
                  <div className="absolute top-0 inset-x-0 transition shadow-md transform origin-top-right md:hidden z-auto">
                  <div className="bg-white overflow-hidden px-4">
                    <div className="pt-6 flex items-center justify-between">
                      <div>
                        <Link to="/">
                        <h1 className="font-bold text-2xl text-orange-500">Will Townsend</h1>
                        </Link>
                      </div>
                      <div className="">
                        <button onClick={this.toggleNav} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                      <div className="pt-2 pb-3 space-y-1" role="none">
                        <Link 
                          to="/blog" 
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                          activeClassName="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          role="menuitem"
                        >
                          Posts
                        </Link>
    
                        <Link 
                          to="/about" 
                          activeClassName="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                          role="menuitem"
                        >
                          About
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                )
              }
            })()}
          </div>
        </div>

      </div>
    )
  }
}

export default Header;
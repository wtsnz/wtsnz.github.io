
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
      <div class="relative bg-white">
        <div class="mx-auto max-w-4xl px-4 ">
          <div class="relative z-10 bg-white lg:max-w-4xl lg:w-full">

            <div class="relative pt-6 pb-8">
              <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div class="flex items-center flex-grow flex-shrink-0">
                  <div class="flex items-center justify-between w-full md:w-auto">
                    <Link to="/">
                      <h1 className="font-bold text-2xl text-orange-500">Will Townsend</h1>
                    </Link>
                    <div class="-mr-2 flex items-center md:hidden">
                      <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" id="main-menu" aria-haspopup="true">
                        <span class="sr-only">Open main menu</span>

                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="hidden md:block md:ml-2 md:pr-4 md:space-x-2">
                  <Link to="/blog" class="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  activeClassName="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">Blog</Link>
                  <Link to="/about" class="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  activeClassName="px-4 py-2 rounded-md font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">About</Link>
                </div>
              </nav>
            </div>


            {/* <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-auto">
              <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div class="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <Link to="/">
                      <h1>Will Townsend</h1>
                    </Link>
                  </div>
                  <div class="-mr-2">
                    <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span class="sr-only">Close main menu</span>

                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                  <div class="px-2 pt-2 pb-3 space-y-1" role="none">
                    <Link 
                      to="/blog" 
                      class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                      activeClassName="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      role="menuitem"
                    >
                      Posts
                    </Link>

                    <Link 
                      to="/about" 
                      activeClassName="bg-gray-50"
                      class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                      role="menuitem"
                    >
                      About
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}



          </div>
        </div>

      </div>
    )
    {/* <header className="app-header">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <div className="navbar-item">
                  <Link exact="true" to={'/'} className="brand">
                    <div className="brand-content">
                      <div className="brand-title is-size-4 is-size-6-mobile">Will Townsend</div>
                    </div>
                  </Link>
                </div>
                
                <span className="nav-toggle" />
                <div className="navbar-burger burger" data-target="mainNav" onClick={this.toggleNav}> 
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
                <div className="navbar-end">
                  <Link exact="true" to={'/'} className='navbar-item' activeClassName="is-active" >Home</Link>
                  <Link exact="true" to={'/blog'} className='navbar-item' activeClassName="is-active" >Blog</Link>
                  <Link exact="true" to={'/about'} className='navbar-item' activeClassName="is-active" >About</Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      ) */}

  }
}

export default Header;
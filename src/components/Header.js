
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
        <header className="app-header">
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
                  <Link exact="true" to={'/books'} className='navbar-item' activeClassName="is-active" >Books</Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
      )
  
    }
    }
  
  export default Header;
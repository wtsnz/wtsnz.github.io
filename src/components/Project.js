
import React from 'react'
import Link from './Link'


const Project = ({ title, subtitle, image, description, link}) => {
    
    if (link == null) {
        return (
            <div className='project-link'>
                <div className='columns '>
                        <div className='column is-narrow project-image has-content-vertically-aligned'>
                            <img style={{ width: '100px', height: '100px', borderRadius: '25px'}} src={image} />
                        </div>
                        <div className='column'>
                            <p className='project-title'>{title}</p>
                            <p className='project-subtitle'>{subtitle}</p>
                            <p className='project-description'>{description}</p>
                        </div>
                </div>
            </div>
        )
    } else {
        return (
            <Link className='project-link' to={link}>
                <div className='columns '>
                        <div className='column is-narrow project-image has-content-vertically-aligned'>
                            <img style={{ width: '100px', height: '100px', borderRadius: '25px'}} src={image} />
                        </div>
                        <div className='column'>
                            <p className='project-title'>{title}</p>
                            <p className='project-subtitle'>{subtitle}</p>
                            <p className='project-description'>{description}</p>
                        </div>
                </div>
            </Link>
        )
    }    
}



// Pane.propTypes = {
//     label: React.PropTypes.string.isRequired,
//     children: React.PropTypes.element.isRequired
// };

export default Project


// <div class="grid-container">
// <div class="grid-project-icon">
// <a href="/products/obs-iphone" title="OBS Studio iPhone Camera Plugin">
// <img style="border-radius: 25px; width: 100px; height: 100px" src="/img/obs-camera-cource-app-icon.svg">
// </a>
// </div>
// <div class="grid-project">
// <h3><a href="/products/obs-iphone">iPhone Camera Plugin for OBS Studio</a></h3>
// <p class="project-date">2018 - Current</p>
// <p>I played around with the OBS Studio plugin API in C++ to write a plugin that allows you to stream high quality video from your iPhone's camera over USB.</p>
// </div>
// </div>
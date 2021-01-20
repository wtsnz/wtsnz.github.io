
import React from 'react'
import Link from './Link'


const Project = ({ title, subtitle, image, description, link}) => {
    
    if (link == null) {
        return (
            <div className='flex px-4 -mx-4 space-x-4 py-4 rounded-lg'>
            <img width="100" height="100" src={image} className="rounded-3xl w-24 h-24"/>
            <div className='flex-1'>
                <div className="text-xl font-semibold">{title}</div>
                <div className='font-medium text-gray-500'>{subtitle}</div>
                <div className=''>{description}</div>
            </div>
    </div>
        )
    } else {
        return (
            <Link className='py-2' to={link}>
                <div className='flex px-4 -mx-4 space-x-4 py-4 rounded-lg hover:text-gray-900 hover:bg-orange-50 group'>
                        <img width="80" height="80" src={image} className="rounded-2xl w-16 h-16"/>
                        <div className='flex-1'>
                            <div className="text-lg font-semibold group-hover:text-orange-500">{title}</div>
                            <div className='font-mono text-sm text-gray-500'>{subtitle}</div>
                            <div className=''>{description}</div>
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

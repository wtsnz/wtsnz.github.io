
import React from 'react'
import Link from './Link'


{/* <Link className='py-2' to={link}>
<div className='flex px-4 -mx-4 space-x-4 py-4 rounded-md hover:text-gray-900 hover:bg-gray-100'>
        <img width="100" height="100" src={image} className="rounded-xl w-32 h-32"/>
        <div className='flex-1'>
            <div className="text-xl font-semibold">{title}</div>
            <div className='font-medium text-gray-500'>{subtitle}</div>
            <div className=''>{description}</div>
        </div>
</div>
</Link> */}

const WorkPlaceDiv = ({ link, date, name, image, role, children }) => {
    return (
        <div className='flex px-4 -mx-4 space-x-4 py-4 rounded-md'>
                <Link to={link} >
                    <img style={{ width: '100px', height: '100px', borderRadius: '25px' }} src={image} />
                </Link>
            <div className='flex-1'>
                <Link className='is-flex' to={link} >
                    <p className='text-xl font-semibold'>{name}</p>
                </Link>
                <p className='font-medium text-gray-500'>{date}</p>
                <p className='font-medium text-gray-500'>{role}</p>
                <div className='work-place-description'>
                    {children}
                </div>
            </div>
        </div>
    )
}

const WorkPlace = ({ link, date, name, image, role, children }) => {
    return (
        <div className='work-place'>
            <WorkPlaceDiv link={link} date={date} name={name} image={image} role={role}>
                {children}
            </WorkPlaceDiv>
        </div>
    )
}

export default WorkPlace

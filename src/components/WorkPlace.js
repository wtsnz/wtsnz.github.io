
import React from 'react'
import Link from './Link'

const WorkPlaceDiv = ({ link, date, name, image, role, children }) => {
    return (
            <div className='columns'>
                    <div className='column is-narrow work-place-image'>
                        <Link to={link} >
                            <img style={{ width: '100px', height: '100px', borderRadius: '25px'}} src={image} />
                        </Link>
                    </div>
                    <div className='column'>
                        <Link className='is-flex' to={link} >
                            <p className='work-place-name'>{name}</p>
                        </Link>
                        <p className='work-place-date'>{date}</p>
                        <p className='work-place-role'>{role}</p>
                        <p className='work-place-description'>
                            {children}
                        </p>
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

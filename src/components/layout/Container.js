import React from 'react'

const Container = ({ children, isContent }) => {

    if (isContent == true) {
        return (
                <div className='container'>
                    <div className='content'>
                        {children}
                    </div>
                </div>
        )
    }

    return (
            <div className='container'>
                {children}
            </div>
    )

}

export default Container

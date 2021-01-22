import React from 'react'

const Container = ({ children, isContent }) => {

    if (isContent == true) {
        return (
                <div className='mx-auto max-w-2xl px-4'>
                    <div className='prose max-w-none'>
                        {children}
                    </div>
                </div>
        )
    }

    return (
            <div className='mx-auto max-w-2xl px-4'>
                {children}
            </div>
    )

}

export default Container

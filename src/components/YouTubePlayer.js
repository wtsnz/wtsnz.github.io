import React from 'react'
import Link from './Link'

const YouTubePlayer = ({ videoUrl }) => {
    return (
        <div>
            <iframe src="${videoUrl}"></iframe>
        </div>
    )
}

export default YouTubePlayer
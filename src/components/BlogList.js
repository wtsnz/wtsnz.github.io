import React from 'react'
import { Link } from 'gatsby'

const BlogList = ({ postTitle, postSlug, postDate }) => (
    <Link className='flex px-4 -mx-4 py-2 md:rounded-md font-medium hover:text-orange-400 hover:bg-orange-50' to={"/" + postSlug}>
        <div className="flex-1">
            {postTitle}
        </div>
        <div className="text-gray-600">
            <small>{postDate}</small>
        </div>
    </Link>
);

export default BlogList

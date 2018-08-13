import React from 'react'
import { Link } from 'gatsby'

const BlogList = ({ postTitle, postSlug, postDate }) => (
    <Link className='blog-link' to={postSlug}>
        <div className='columns'>
                <div className='column'>
                    <p>{postTitle}</p>
                </div>
                <div className='column is-narrow'>
                    <small>{postDate}</small>
                </div>
        </div>
    </Link>
);



// Pane.propTypes = {
//     label: React.PropTypes.string.isRequired,
//     children: React.PropTypes.element.isRequired
// };

export default BlogList

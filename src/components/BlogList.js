import React from 'react'
import { Link } from 'gatsby'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'


const BlogList = ({ postTitle, postSlug, postDate }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1rem'
    }}>
        <h3
            style={{
                marginBottom: 0,
                marginTop: 0,
                flexGrow: 1
            }}
        >
            <Link style={{ boxShadow: 'none' }} to={postSlug}>
                {postTitle}
            </Link>
        </h3>
        <small style={{ textAlign: 'right' }}>{postDate}</small>
        {/* <p dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
    </div>
);



// Pane.propTypes = {
//     label: React.PropTypes.string.isRequired,
//     children: React.PropTypes.element.isRequired
// };

export default BlogList

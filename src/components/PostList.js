import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import Config from '../config';

const PostList = ({ posts, children }) => {
  return (
    <div className="postlist">

      {posts.map(post => (
        <div className="row postlist-item" key={post.node.slug}>
          <div className="col-sm postlist-first-column">
            <time className="postlist-date" dateTime="">{
              DateTime.fromISO(post.node.date, { zone: Config.timezone }).toFormat('yyyy MMM, d')
              }</time>
          </div>
          <div className="col-sm"> 
            <Link className="postlist-link" to={post.node.link} >{post.node.title}</Link>
            <div>
            {/* {post.tags.map(tag => (
              <a key={tag.term_id} href="#" className="tag badge badge-light">{tag.name}</a>
            ))} */}
            </div>
          </div>
          </div>
          ))}
       </div>
      );
    };
    export default PostList;

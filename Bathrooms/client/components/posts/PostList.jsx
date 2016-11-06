import React from 'react';
import PostItem from '../posts/PostItem.jsx';


const propTypes = {
  posts: React.PropTypes.array,
};

export default class PostList extends React.Component {
  render() {

   const postElements = this.props.posts.map((post,idx) => {
          return (
            <div key = {idx}>
            <PostItem
              key={idx}
              deletePost={this.props.deletePost}
              handlePublish={this.props.handlePublish}
              body={post.body}
              id={post.id}
              />
            </div>
          );
        });
      return(
        <ul>
      {postElements}
        </ul>
      )
  }
}

PostList.propTypes = propTypes;

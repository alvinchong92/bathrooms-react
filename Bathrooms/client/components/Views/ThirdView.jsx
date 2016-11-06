import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import PostForm from '../posts/PostForm.jsx';
import PostList from '../posts/PostItem.jsx';

export default class ThirdView extends React.Component {
  constructor(props) {
    super(props)
     this.state = { posts: [] };
     this.logIn = this.logIn.bind(this);
     this.signUp = this.signUp.bind(this);
     this.signOut = this.signOut.bind(this);
     this.sendPost = this.sendPost.bind(this);
     this.deletePost = this.deletePost.bind(this);
     this.handlePublish = this.handlePublish.bind(this);
     this.updatePost = this.updatePost.bind(this);
     this.handlePublishPost = this.handlePublishPost.bind(this);
  }

   componentDidMount() {
       this.getCurrentUserPosts();
     }

  getCurrentUserPosts() {
    request.get('/api/posts')
      .then((response) => {
        console.log(response)
        const postData = response.body;
        let posts = [];
        if(postData) {
          posts = Object.keys(postData).map((id) => {
            const individualPostData = postData[id];
            return {
              id: individualPostData.id,
              body: individualPostData.body,
            }
          })
        }
        this.setState({ posts });
      })
  }
  sendPost({ body }) {
     request.post('/api/posts')
           .send({ body })
           .then(() => {
              this.getCurrentUserPosts();
            });
   }

   deletePost(id) {
    request.del(`/api/posts/${id}`)
           .then(() => {
            this.getCurrentUserPosts();
           })
   }

   handlePublish({id, content}) {
    if(id) {
      this.updatePost({ id, content })
    } else{
      this.handlePublishPost({ content })
    }
   }

   updatePost({ id, content }) {
    request.patch(`/api/post/${id}`)
           .send({ content })
           .then(() => {
              this.getCurrentUserPosts();
           })
   }

   handlePublishPost({ content }) {
    request.post(`/api/posts/${id}`)
           .send({ content })
           .then(() => {
            this.getCurrentUserPosts();
           })
   }

   signOut() {
     request.post('/api/signout')
            .then(() => this.updateAuth());
   }

   logIn(userDetails) {
     request.post('/api/login')
          .send(userDetails)
          .then(() => {
            this.updateAuth();
            this.getCurrentUserPosts();
          });
   }
   signUp(userDetails) {
    console.log(userDetails)
     request.post('/api/signup')
           .send(userDetails)
           .then(() => {
             this.updateAuth();
             this.getCurrentUserPosts();
           });
   }

  render() {
    return(
      <div>
        <h2> you are awesome </h2>
        <PostForm sendPost={this.sendPost} deletePost={this.deletePost} />
        <PostList posts={this.state.posts} deletePost={this.deletePost} />
      </div>
    )
  }
}

 import React from 'react';
 import request from 'superagent';
 import cookie from 'react-cookie';
 import UserForm from '../user/UserForm.jsx';
 import PostList from '../posts/PostList.jsx';
 import PostForm from '../posts/PostForm.jsx';

 const propTypes = {};

 class App extends React.Component {
   constructor(props) {
     super(props);
     this.state = { posts: [] };
     this.sendPost = this.sendPost.bind(this);
     this.deletePost = this.deletePost.bind(this);
     this.handlePublish = this.handlePublish.bind(this);
     this.updatePost = this.updatePost.bind(this);
     this.handlePublishPost = this.handlePublishPost.bind(this);
   }
   componentDidMount() {
     this.updateAuth();
     if (cookie.load('token')) {
       this.getCurrentUserPosts();
     }
   }
   getCurrentUserPosts() {
     request.get('/api/posts')
            .then((response) => {
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
            .catch(() => {
              this.updateAuth();
            });
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

   updateAuth() {
     this.setState({
       token: cookie.load('token'),
     });
   }

   render() {
     let userDisplayElement;
     if (this.state.token) {
       userDisplayElement = (
         <div>
           <button id="Log-Out" onClick={this.signOut} >Log-Out!</button>
           <div id="thirdview-postform">
           <PostForm sendPost={this.sendPost} deletePost={this.deletePost} handlePublish={this.handlePublish} />
           </div>
           <div id="title-display"> Bathrooms </div>
           <PostList posts={this.state.posts} deletePost={this.deletePost} handlePublish = {this.handlePublish} />
           <footer className="footer"> </footer>
         </div>
       );
     }
     return (
       <div>
         {userDisplayElement}
       </div>
     );
   }
 }

 App.propTypes = propTypes;

 export default App;

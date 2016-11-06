 import React from 'react';
 import request from 'superagent';
 import cookie from 'react-cookie';
 import UserForm from './user/UserForm.jsx';
 import Map from './map/map.jsx';
 import PostForm from './posts/PostForm.jsx';
 import PostList from './posts/PostList.jsx';

 const propTypes = {};

 class App extends React.Component {
   constructor(props) {
     super(props);
     this.state = { posts: [], x: [] };
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
     this.updateAuth();
     if (cookie.load('token')) {
       this.getCurrentUserPosts();
       this.getData();
     }
   }

  getData() {
    let x = [];
    fetch("bathroom.json").then((response) => {
      if(response.ok) {
        response.json().then((results) => {
          results.data.map((newData) => {
            let y = newData[9];
            if( y != null) {
            x.push(y);
            }
          })
        })
      }
    })
    this.setState({
      x: x
    });
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

   signOut() {
     request.post('/api/signout')
            .then(() => this.updateAuth());
   }
   updateAuth() {
     this.setState({
       token: cookie.load('token'),
     });
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
     let userDisplayElement;
     if (this.state.token) {
       userDisplayElement = (
         <div>
           <button id="Log-Out" onClick={this.signOut} >Log-Out!</button>
           <Map x={this.state.x}/>
           <div>
           <PostForm sendPost={this.sendPost} deletePost={this.deletePost}/>
           <div id="title_display"> Places to Poop </div>
           <PostList posts={this.state.posts} deletePost={this.deletePost} x={this.state.x} />
           </div>
           <footer className="footer"> </footer>
         </div>
       );
     } else {
       userDisplayElement = (
         <div id="User-Container">
           <UserForm handleSubmit={this.signUp} buttonText="Sign-Up" />
           <UserForm handleSubmit={this.logIn} buttonText="Log-In" />
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

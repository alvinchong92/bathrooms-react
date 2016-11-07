import React from 'react';
import {Link, withRouter} from 'react-router'
import NextView from '../Views/NextView.jsx';

 class FrontView extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      posts: this.props.posts || [],
      spots: this.props.spots || '',
      localContent: this.props.content || '',
      linktoSearch: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    this.setState({
      localContent: nextProps.content || '',
    });
  }

  handleChange(e) {
    const target = e.target.value;
    console.log(target)
    this.setState({
      localContent: target
    })
  }
  handleSubmit() {
    this.setState({
      linktoSearch: true
    })
  }

  render() {
    return(
      <div>
      {this.state.linktoSearch ?
        <NextView
        Content = {this.state.localContent}
        Spots={this.state.spots}
        Posts={this.state.posts}
        />:
        <div>
          <div id="front-box">
          <h2> Where the bathrooms at ? </h2>
          </div>
         <form id="first-form" onSubmit={this.handleSubmit}>
         <input className="input"
         type="text"
         placeholder="10 E 21st St, New York, NY 10010"
         onChange={this.handleChange}
         value={this.state.localContent}
         />
          <button className="btn" type="submit"> SEARCH </button>
        </form>
        </div>
      }
      </div>
    )
  }
}

export default withRouter(FrontView);

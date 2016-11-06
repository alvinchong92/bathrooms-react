import React from 'react';
import {Link, withRouter} from 'react-router'
import NextView from '../Views/NextView.jsx';

 class FrontView extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
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
    // this.props.router.push('NextView')
  }

  render() {
    return(
      <div>
      {this.state.linktoSearch ?
        <NextView
        Content = {this.state.localContent}
        Spots={this.state.spots}
        />:
        <div>
          <h1> This is the first View </h1>
         <form onSubmit={this.handleSubmit}>
         <input
         type="text"
         placeholder="Enter a location"
         onChange={this.handleChange}
         value={this.state.localContent}
         />
          <button type="submit"> Hit </button>
        </form>
        </div>
      }
        <div>
          <ul>
            <ol><Link to="nextview"> Maps</Link> </ol>
            <ol><Link to="thirdview"> Notes</Link> </ol>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(FrontView);

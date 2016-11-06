import React from 'react';
import {withRouter} from 'react-router'

 class FrontView extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);

    }
  handleSubmit() {
    this.props.router.push('NextView')
  }

  render() {
    return(
      <div>
        <h1> This is the first View </h1>
        <button onClick={this.handleSubmit}> Click </button>
      </div>
    )
  }
}

export default withRouter(FrontView);

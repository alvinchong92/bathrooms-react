import React from 'react';
import {withRouter} from 'react-router';
import Map from '../map/map.jsx';

 class NextView extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);

    }
  handleSubmit() {
    this.props.router.push('ThirdView')
  }

  render() {
    return(
      <div>
        <h1> Great this is the 2nd View </h1>
        <Map />
        <button onClick={this.handleSubmit}> Click </button>
      </div>
    )
  }
}

export default withRouter(NextView);

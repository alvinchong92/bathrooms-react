import React from 'react';
import {withRouter} from 'react-router';
import Map from '../map/map.jsx';

 class NextView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { spots: this.props.Spots || ['19 Kenmare St'],
     localContent: this.props.Content || '',
     posts: this.props.Posts || '',
     linktoSearch: false
   }
    this.handleSubmit = this.handleSubmit.bind(this);
    }

  componentWillReceiveProps(nextProps) {
    this.setState({
      localContent: nextProps.content || '',
      spots: nextProps.spots || '',
      posts: nextProps.posts || ''
    });
  }

  handleSubmit() {
    this.props.router.push('thirdview')
  }

  render() {
    return(
      <div>
        <div>
        <Map spots={this.state.spots} content={this.props.Content} />
        <button className="btn" onClick={this.handleSubmit}> Add a bathroom </button>
        </div>
      </div>
    )
  }
}

export default withRouter(NextView);

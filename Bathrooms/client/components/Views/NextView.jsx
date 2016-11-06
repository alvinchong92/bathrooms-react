import React from 'react';
import {withRouter} from 'react-router';
import Map from '../map/map.jsx';

 class NextView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { spots: ['19 Kenmare St, NY'], localContent: this.props.Content || '' }
    this.handleSubmit = this.handleSubmit.bind(this);
    }


  componentWillReceiveProps(nextProps) {
    this.setState({
      localContent: nextProps.content || '',
    });
  }

  componentDidMount() {
    this.getData();
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
        } else {
          console.log("problem")
        }
      })
      console.log(x)
      this.setState({
      spots: x
      });
    console.log(this.state.spots)
    console.log(this.props)
    console.log(this.props.Content)
  }
  handleSubmit() {
    this.props.router.push('ThirdView')
  }

  render() {
    return(
      <div>
        <h1> Great this is the 2nd View </h1>
        <Map spots={this.state.spots} content={this.props.Content} />
        <button onClick={this.handleSubmit}> Click </button>
      </div>
    )
  }
}

export default withRouter(NextView);

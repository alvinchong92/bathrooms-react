import React from 'react';

const propTypes = {
  sendPost: React.PropTypes.func,
};

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const value = target.value;
    const updated = {};
    updated[name] = value;
    this.setState(updated)
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.sendPost(this.state)
    this.setState({
      body: ''
    })
  }


  render() {
    return(
      <div>
        <form id="Post-Form" onSubmit= {this.handleSubmit}>
          <input className="input"
            type="text"
            placeholder="Add a bathroom"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <input className="btn" type="submit" value="Add"/>
        </form>
      </div>
    )
  }
}

PostForm.propTypes = propTypes;

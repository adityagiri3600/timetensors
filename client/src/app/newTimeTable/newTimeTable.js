import React from 'react';
import axios from 'axios';
import './newTimeTable.css';

class NewTimeTable extends React.Component {
  handleResponse = (response) => {
    if (response.status === 200) {
      this.props.setTtRoute(response.data.ttRoute);
      this.props.setCreated(true);
    }
  };

  handleClick = () => {
    axios.post('api/timetable/new', {
      ttName: this.props.ttName,
      classes: this.props.classes,
      editCode: this.props.editCode
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(this.handleResponse)
    .catch(error => console.error('Error:', error));
    console.log(this.props.classes);
  };

  render() {
    return (
      <button onClick={this.handleClick} className='newTimeTable-btn' disabled={this.props.disabled}>
        Create
      </button>
    );
  }
}

export default NewTimeTable;

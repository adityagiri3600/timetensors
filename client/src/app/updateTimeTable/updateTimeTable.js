import React from 'react';
import './updateTimeTable.css';

class UpdateTimeTable extends React.Component {

  handleResponse = (response) => {
    if (response.status === 200) {
      response.json().then(data => {
        console.log("Time table updated")
      });
    }
  };

  handleClick = () => {
    fetch('/api/updateTimeTable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ttName: this.props.ttName,
        classes: this.props.classes,
        ttCode: this.props.ttCode
      })
    })
      .then(this.handleResponse)
      .catch(error => console.error('Error:', error));
    console.log(this.props.classes);
    window.location.replace(`/${this.props.ttCode}`);
  };

  render() {
    return (
      <button onClick={this.handleClick} className='newTimeTable-btn' disabled={this.props.disabled}>
        Update
      </button>
    );
  }
}

export default UpdateTimeTable;

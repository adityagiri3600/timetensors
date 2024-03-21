import React from 'react';
import './newTimeTable.css';

class NewTimeTable extends React.Component {

  handleResponse = (response) => {
    if (response.status === 200) {
      response.json().then(data => {
        this.props.setTtRoute(data.ttRoute);
        this.props.setCreated(true);
      });
    }
  };

  handleClick = () => {
    fetch('/api/newTimeTable', {
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

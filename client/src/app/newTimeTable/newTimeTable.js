import React from 'react';
import './newTimeTable.css';

class NewTimeTable extends React.Component {
  handleClick = () => {
    fetch('/api/newTimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ttName: this.props.ttName,
                                classes: this.props.classes
                              })
    })
    .then(response => response.json())
    .then(data => console.log(data))
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

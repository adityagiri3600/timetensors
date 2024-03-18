import React from 'react';
import './newTimeTable.css';

class NewTimeTable extends React.Component {
  handleClick = () => {
    fetch('/api/newTimeTable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ttName: 'timetable1',
                                classes:[
                                        { day: 1, subject: 'Math', start: '09:00', end: '10:00' },
                                        { day: 1, subject: 'OOPS', start: '10:00', end: '11:00' }
                                ]})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  render() {
    return (
      <button onClick={this.handleClick} className='newTimeTable-btn'>
        +
      </button>
    );
  }
}

export default NewTimeTable;

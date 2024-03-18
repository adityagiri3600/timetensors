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
                                        { day: this.props.day, subject: this.props.subject, start: this.props.start, end: this.props.end }
                                ]})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  render() {
    return (
      <button onClick={this.handleClick} className='newTimeTable-btn'>
        Create
      </button>
    );
  }
}

export default NewTimeTable;

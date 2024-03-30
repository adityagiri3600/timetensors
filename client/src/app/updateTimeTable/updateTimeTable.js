import React from 'react';
import axios from 'axios';
import './updateTimeTable.css';

class UpdateTimeTable extends React.Component {

    handleResponse = (response) => {
        if (response.status === 200) {
            console.log("Time table updated");
            window.location.replace(`/${this.props.ttRoute}`);
        }
        else {
            console.error("Error updating time table");
            this.props.setEditCodeError(true);
        }
    };

    handleClick = () => {
        axios.post(`/api/timetable/update/${this.props.ttRoute}`, {
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
    };

    render() {
        return (
            <button onClick={this.handleClick} className='updateTimeTable-btn' disabled={this.props.disabled}>
                Update
            </button>
        );
    }
}

export default UpdateTimeTable;

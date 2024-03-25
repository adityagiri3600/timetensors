import React from 'react';
import './updateTimeTable.css';

class UpdateTimeTable extends React.Component {

    handleResponse = (response) => {
        if (response.status === 200) {
            console.log("Time table updated")
            window.location.replace(`/${this.props.ttRoute}`);
        }
        else {
            console.error("Error updating time table")
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
                ttRoute: this.props.ttRoute,
                editCode: this.props.editCode
            })
        })
            .then(this.handleResponse)
            .catch(error => console.error('Error:', error));
        console.log(this.props.classes);
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

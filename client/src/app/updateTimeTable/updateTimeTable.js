import React from 'react';
import axios from 'axios';
import './updateTimeTable.css';

class UpdateTimeTable extends React.Component {

    handleResponse = (response) => {
        if (response.status === 200) {
            console.log("Time table updated");
            window.location.replace(`/${this.props.ttRoute}`);

            // save body to local storage
            if(window !== undefined)
                localStorage.setItem(`${this.props.body.ttName}EditCode`, this.props.body.editCode);
        } else {
            console.error("An error occurred");
        }
    };

    handleErrorResponse = (error) => {
        console.error("Invalid edit code");
        this.props.setEditCodeError(true);
    }


    handleClick = () => {
        axios.post(`/api/timetable/update/${this.props.ttRoute}`,
            this.props.body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .catch(this.handleErrorResponse)
            .then(this.handleResponse)
    };

    render() {
        return (
            <button onClick={this.handleClick} className='updateTimeTable-btn' disabled={this.props.disabled}  tabIndex={-1}>
                Update
            </button>
        );
    }
}

export default UpdateTimeTable;

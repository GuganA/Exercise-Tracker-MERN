import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   
toast.configure()

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            user: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3006/users/')
        .then(response => {
            if(response.data.indexOf('error')){
                toast.error(response.data);
            } else {
                toast.info(response.data);
            }
            
            if(response.data.length > 0) {
                this.setState({
                    user: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
        this.setState({
            user: ['testuser'],
            username: 'testuser'
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const exercises = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        };

        axios.post('http://localhost:3006/exercises/add', exercises)
        .then(response => {
            if(response.data.indexOf('error')){
                toast.error(response.data);
            } else {
                toast.info(response.data);
            }
            console.log(response.data);
        }).catch(err => {
            toast.error(err);
            console.log(err);
        });

        window.location = '/';
    }


    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label>UserName : </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={(e) => this.onChangeUsername(e)}>
                            {
                                this.state.user.map((user) => {
                                    return <option key={user}
                                        value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description : </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={(e) => this.onChangeDescription(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (In minutes) : </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={(e) => this.onChangeDuration(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date : </label>
                        <div>
                            <DatePicker className="form-control"
                                selected={this.state.date}
                                onChange={(e) => this.onChangeDate(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="Submit" value = "Create New Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

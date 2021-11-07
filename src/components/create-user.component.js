import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   
toast.configure()

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        axios.post('http://localhost:3006/users/add', user)
        .then((response) => {
            if(response.data.indexOf('error')){
                toast.error(response.data);
            } else {
                toast.info(response.data);
            }
            console.log(response.data);
        }).catch((err) => {
            toast.error(err.message);
            console.log(err);
        })

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h1>Create New User</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username : </label>
                        <input type="text" 
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="Submit" value = "Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

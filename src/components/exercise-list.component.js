import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

toast.configure()

const Exercise = (props) => {
    let normalDate = moment(props.exercise.date).format('DD-MM-YYYY hh:mm:ss');
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration} minutes</td>
            <td>{normalDate}</td>
            <td>
                <Button to={'/edit/' + props.exercise._id} variant="outlined">Update</Button> | <Button onClick={() => props.deleteExercise(props.exercise._id)} startIcon={<DeleteIcon />} variant="contained">Delete</Button>
            </td>
        </tr>
    )
}

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercise: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:3006/exercises/')
            .then(response => {
                if (response.data.indexOf('error')) {
                    toast.error(response.data);
                } else {
                    toast.info(response.data);
                }
                console.log(response.data);
                this.setState({ exercise: response.data })
            }).catch(err => {
                toast.error(err);
                console.log(err);
            });
    }

    deleteExercise(id) {
        axios.delete('http://localhost:3006/exercises/' + id)
            .then(response => {
                toast.success('Log deleted successfully');
                console.log(response.data);
            }).catch(err => {
                toast.error(err);
                console.log(err);
            });

        this.setState({
            exercise: this.state.exercise.filter(exercise => exercise._id !== id)
        });
    }

    exerciseList() {
        return this.state.exercise.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Exercise Lists</h3>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date & Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

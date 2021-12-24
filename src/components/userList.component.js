import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

toast.configure();

const Users = (props) => {
  return (
    <tr>
      <td>{props.user.username}</td>
      <td>
      
      <Button onClick={() => props.deleteUser(props.user._id)} variant="contained" startIcon={<DeleteIcon />} >Delete</Button>
      </td>
    </tr>
  );
};

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      user: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3006/users/").then((response) => {
      if (response.data.indexOf("error")) {
        toast.error(response.data);
      } else {
        toast.info(response.data);
      }
      console.log('hell nahh ',response.data);

      if (response.data.length > 0) {
        this.setState({
          user: response.data
        });
      }
    });
  }

  deleteUser(id) {
    axios.delete("http://localhost:3006/users/" + id)
      .then((response) => {
        toast.success("User deleted successfully");
        console.log(response.data);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });

    this.setState({
      user: this.state.user.filter((users) => users._id !== id),
    });
  }

  userlist() {
    return this.state.user.map((currentUser) => {
      return (
        <Users
          user={currentUser}
          deleteUser={this.deleteUser}
          key={currentUser._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3> User Lists </h3>
        <h1> </h1>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Username </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>{this.userlist()}</tbody>
        </table>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  onChangeUsername = function(e) {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = function(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    axios.post('http://localhost:5000/users/add', user).then(res => {
      if (res.data.msg !== `${user.username} already exists!`) {
        this.setState({
          username: '',
          users: [user.username, ...this.state.users],
        });
      }
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <input
              type='text'
              required
              className='form-control'
              name='username'
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className='form-group'>
            <input type='submit' value='Create User' className='btn btn-primary' />
          </div>
        </form>
        {this.state.users && (
          <div>
            <table className='table'>
              <thead className='thead-light'>
                <tr>
                  <th>Users' List</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(username => (
                  <tr key={username}>
                    <td>{username}</td>
                    <td>
                      <Link className='btn btn-secondary' to={`/edit-exercise/`}>
                        Edit Username
                      </Link>{' '}
                      <button className='btn btn-danger'>Delete User</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get('/exercises/')
      .then(res => {
        this.setState({
          exercises: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteExercise(id) {
    axios.delete(`/exercises/${id}`).then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(exercise => exercise._id !== id),
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map(currentExercise => (
              <Exercise
                key={currentExercise._id}
                exercise={currentExercise}
                deleteExercise={this.deleteExercise}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/layout/Navbar';
import ExerciseList from './components/exercises/ExerciseList';
import EditExercise from './components/exercises/EditExercise';
import CreateExercise from './components/exercises/CreateExercise';
import CreateUser from './components/users/CreateUser';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route path='/' exact component={ExerciseList} />
        <Route path='/edit-exercise/:id' component={EditExercise} />
        <Route path='/create-exercise' component={CreateExercise} />
        <Route path='/create-user' component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

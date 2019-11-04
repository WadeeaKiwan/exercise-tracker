import React from 'react';
import { Link } from 'react-router-dom';

export default function Exercise({
  exercise: { _id, username, description, duration, date },
  deleteExercise,
}) {
  return (
    <tr>
      <td>
        <strong>{username}</strong>
      </td>
      <td>{description}</td>
      <td>{duration}</td>
      <td>{date.substring(0, 10)}</td>
      <td>
        <Link className='btn btn-secondary' to={`/edit-exercise/${_id}`}>
          Edit
        </Link>{' '}
        <button className='btn btn-danger' onClick={() => deleteExercise(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import { updatedStateWithResponse } from '../utils/updatedState';

const initialFormValues = {
  title: '',
  director: '',
  metascore: 0,
};

const MovieUpdateForm = (props) => {

  const [formValues, setFormValues] = useState(initialFormValues);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (props.movieList.length > 0) {
      setFormValues(getCurrentMovie(props.movieList));
    } else {
      axios.get('http://localhost:5000/api/movies')
        .then(res => {
          props.setMovieList(res.data);
          setFormValues(getCurrentMovie(res.data));
        })
        .catch(err => console.log(err));
    }
  }, []);

  const handleChanges = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = e => {
    e.preventDefault();
    const putValues = formatValuesForPut();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, putValues)
      .then(res => {
        props.setMovieList(updatedStateWithResponse(props.movieList, res.data));
        history.push(`/movies/${params.id}`);
      })
      .catch(err => console.log(err));
  };

  const getCurrentMovie = (sourceObj) => {
    return sourceObj.filter(movie => movie.id === Number(params.id))[0];
  };

  const formatValuesForPut = () => {
    return {
      id: Number(params.id),
      title: formValues.title.trim(),
      director: formValues.director.trim(),
      metascore: Number(formValues.metascore),
      stars: getCurrentMovie(props.movieList).stars
    };
  };

  return (
    <div className='MovieUpdateForm'>
      <h2>Edit Movie Details</h2>
      <form onSubmit={handleUpdate}>
        <label htmlFor='title'>Title</label>
        <br/>
        <input
          id='title'
          name='title'
          value={formValues.title}
          onChange={handleChanges}
        />
        <br />
        <label htmlFor='director'>Director</label>
        <br/>
        <input
          id='director'
          name='director'
          value={formValues.director}
          onChange={handleChanges}
        />
        <br />
        <label htmlFor='metascore'>Metascore</label>
        <br/>
        <input
          id='metascore'
          name='metascore'
          type='number'
          min='0'
          max='100'
          value={formValues.metascore}
          onChange={handleChanges}
        />
        <br />
        <button className='movie-button normal-button'>Submit</button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
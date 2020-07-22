import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  title: '',
  director: '',
  metascore: 0,
};

const MovieUpdateForm = (props) => {

  const [formValues, setFormValues] = useState(initialFormValues);
  const params = useParams();

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
    console.log(putValues);
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, putValues)
      .then(res => props.setMovieList(updatedStateWithResponse(props.movieList, res.data)))
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

  const updatedStateWithResponse = (state, update) => {
    return state.map(item => {
      if (item.id === update.id) {
        return update;
      } else {
        return item;
      }
    });
  };

  return (
    <div className='MovieUpdateForm'>
      <form onSubmit={handleUpdate}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          name='title'
          value={formValues.title}
          onChange={handleChanges}
        />
        <br />
        <label htmlFor='director'>Director</label>
        <input
          id='director'
          name='director'
          value={formValues.director}
          onChange={handleChanges}
        />
        <br />
        <label htmlFor='metascore'>Metascore</label>
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
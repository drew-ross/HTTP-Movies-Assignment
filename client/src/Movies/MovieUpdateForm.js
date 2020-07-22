import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  title: '',
  director: '',
  metascore: 0,
}

const MovieUpdateForm = (props) => {

  const [formValues, setFormValues] = useState(initialFormValues);
  const params = useParams();
  
  useEffect(() => {
    if (props.movieList.length > 0) {
      setFormValuesToCurrentMovie(props.movieList);
    } else {
      axios.get('http://localhost:5000/api/movies')
        .then(res => {
          props.setMovieList(res.data);
          setFormValuesToCurrentMovie(res.data);
        })
        .catch(err => console.log(err))
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
    axios
      .put(``)
  }

  const setFormValuesToCurrentMovie = (sourceObj) => {
    setFormValues(sourceObj.filter(movie => movie.id === Number(params.id))[0]);
  };

  const formatValuesForPut = () => {
    return {
      title: formValues.title.trim(),
      director: formValues.director.trim(),
      metascore: Number(formValues.metascore),
      stars: props.movieList.filter(movie => movie.id === params.id).stars
    }
  }

  return (
    <div className='MovieUpdateForm'>
      <form>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          name='title'
          value={formValues.title}
          onChange={handleChanges}
        />
        <br/>
        <label htmlFor='director'>Director</label>
        <input
          id='director'
          name='director'
          value={formValues.director}
          onChange={handleChanges}
        />
        <br/>
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
        <br/>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
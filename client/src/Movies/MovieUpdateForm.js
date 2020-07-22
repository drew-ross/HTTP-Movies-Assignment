import React, { useState } from 'react';

const initialFormValues = {
  title: '',
  director: '',
  metascore: 0,
}

const MovieUpdateForm = (props) => {

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChanges = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

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
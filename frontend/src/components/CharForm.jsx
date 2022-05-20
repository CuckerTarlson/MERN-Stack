import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createChar } from '../features/chars/charSlice'

function CharForm() {
  const [formData, setFormData] = useState({
    charName: '',
    Class: '',
    weapon: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { charName, Class, weapon} = formData

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createChar({ charName, Class, weapon }))
    setFormData('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Character Name</label>
          <input
            type='text'
            name='charName'
            id='charName'
            value={charName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor='text'>Class</label>
          <input 
            type='text' 
            name='Class'
            id='Class'
            value={Class}
            onChange={handleChange}
            />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Weapon</label>
          <input
            type='text'
            name='weapon'
            id='weapon'
            value={weapon}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Character
          </button>
        </div>
      </form>
    </section>
  )
}

export default CharForm

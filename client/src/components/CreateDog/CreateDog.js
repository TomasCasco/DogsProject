import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDog, clearDogsAdd, getTemperaments } from '../../actions';

import './CreateDog.css';


function validate(input) {
  let errors = {}
  if (!input.name) {
    errors.name = 'Name is required'
  } else {
    errors.name = ''
  }
  if (!input.weight) {
    errors.weight = 'Weight is required'
  } else {
    errors.weight = ''
  }

  if (!input.height) {
    errors.height = 'Height is required'
  } else {
    errors.height = ''
  }
  if (!input.life_span) {
    errors.life_span = 'Lifespan is required'
  } else {
    errors.life_span = ''
  }
  return errors
};

const CreateDog = () => {

  const dispatch = useDispatch();
  const dogsAdd = useSelector(state => state.dogsAdd)
  const temperamentsDb = useSelector(state => state.temperamentsDb)
  const [input, setInput] = useState({ name: '', weight: '', height: '', years_life: '', temperaments: '', });
  const [errors, setErrors] = useState({});
  
  document.title = 'CreateDog'

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])

  let filtro = [];
  let array = [];
  if (input.temperaments.length) {
    for (let i = 0; i < input.temperaments?.length; i++) {
      filtro = temperamentsDb?.filter(
        (temp) => temp.id === input.temperaments[i]
      );
      array.push(...filtro);
    }
  }


  const handleInputChange = function (e) {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addDog({ name: input.name, weight: input.weight, height: input.height, years_life: input.years_life, temperaments: input.temperaments }))
    setInput({ name: '', weight: '', height: '', years_life: '', temperaments: '', })
  }

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value, })
  }

  const clearDogAdd = (e) => {
    e.preventDefault()
    dispatch(clearDogsAdd())
    setInput({ name: '', weight: '', height: '', years_life: '', temperaments: '', })
  }
  return (
    <section>
      <br></br>
      {typeof (dogsAdd) === "object" ?
        <div>
          
          
          <button type='button' onClick={clearDogAdd} >Add a breed</button>
        </div>
        :
        
        <>
          <form className='form_dogs' onSubmit={e => handleSubmit(e)}>
            <section className='section_create'>
              <label>Name  </label>
              <input className={errors.name && 'danger'} name="name" value={input.name} placeholder='nombre' onChange={handleChange, handleInputChange} />
              <br></br>
              {errors.name && (
                <p className="danger">{errors.name}</p>
              )}
            </section>
            <section className='section_create'>
              <br></br>
              <label>Weight (Min - Max)  </label>
              <input className={errors.weight && 'danger'} name="weight" value={input.weight} placeholder='Min - Max' onChange={handleChange, handleInputChange} />
              <br></br>
              {errors.weight && (
                <p className="danger">{errors.weight}</p>
              )}
            </section>
            <section className='section_create'>
              <br></br>
              <label>Height  (Min - Max)  </label>
              <input className={errors.height && 'danger'} name="height" value={input.height} placeholder='Min - Max' onChange={handleChange, handleInputChange} />
              <br></br>
              {errors.height && (
                <p className="danger">{errors.height}</p>
              )}
            </section>
           
              <br></br>
              <label>Lifespan (Min - Max)  </label>
              <input name="years_life" value={input.years_life} placeholder='Min - Max' onChange={handleChange} />
              <br></br>
              <br></br>
         
              <section className='cd_datalist'>
              <label>
                Temperamentos
                <input list="temperaments" multiple  autoComplete='off' name="temperaments" onChange={handleChange} />
              </label>
              <datalist id="temperaments" multiple  >
                {
                  temperamentsDb?.map((t, key) => (
                    <option key={key} value={t} />
                  ))
                }
              </datalist>
              
            </section>
            
            <br></br>
            <br></br>
            <button
              className={`${(Object.keys(errors).length || !errors) }`}
              type="submit">Create new breed</button>
          </form>
        </>
      }
    </section>
  )
}

export default CreateDog;
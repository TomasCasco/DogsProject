import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, getDogTemperament, getDogsLoaded, getDogsOrder, removegetDogsLoaded, removedogsTemperaments } from '../../actions';
import './Search.css';
// import {logo} from '../../../public/images/search-dog.jpg';

const Search = () => {

    const dispatch = useDispatch();
    const temperamentsDb = useSelector(state => state.temperamentsDb)
    const [state, setState] = useState({ title: "", temperament: "", alfabeto: true, peso: true, })


    useEffect(() => {
        if (!temperamentsDb) dispatch(getTemperaments())
    }, [])

    const handleChange = (event) => {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        // state.title? dispatch(getDogs(state.title)) : alert('No has colocado una raza 🤷‍♂️')
        dispatch(getDogsLoaded(state.title))
        setState({ ...state, title: "" });
    }
    const handleTemperament = (e) => {
        e.preventDefault();
        state.temperament ? dispatch(getDogTemperament(state.temperament)) : alert('No has colocado un Temperamento 🤷‍♂️')
        dispatch(removegetDogsLoaded())
        setState({ ...state, temperament: "" });

    }

    const handleOrder = (e, name) => {
        e.preventDefault();
        dispatch(getDogsOrder({ name, state: state[name] }))
        dispatch(removegetDogsLoaded())
        dispatch(removedogsTemperaments())
    }

    return (
        <div>
            
            <form className="form-container" >
            <br></br>
               
                <br></br>
                <div>
                    <label > Find by temperament : </label>
                    <select className='input_search' name="temperament" value={state.temperament} onChange={(e) => handleChange(e)} >
                        {
                            temperamentsDb?.map((t, key) => (
                                <option key={key} value={t}>{t}</option>
                            ))
                        }
                    </select>
                    
                    <button
                        className={`${!state.temperament?.length && "disabled"}`}
                        type="button" name="temperament" onClick={(e) => handleTemperament(e)}>SEARCH</button>
                </div>
                <br></br>
                <div>
                    <label >Sort by : </label>
                    <input className='link_order' type="button" name='alfabeto' onClick={() => setState({ ...state, alfabeto: !state.alfabeto })} value={state.alfabeto ? 'A -Z' : 'Z - A'} />
                    <button type="button" onClick={(e,) => handleOrder(e, 'alfabeto')} >SORT</button>
                </div>
                <br></br>
                <div>
                    <label >Sort by weight : </label>
                    <input className='link_order' type="button" name='peso' onClick={() => setState({ ...state, peso: !state.peso })} value={state.peso ? 'Min - Max ' : 'Max - Min'} />
                    <button type="button" onClick={(e) => handleOrder(e, 'peso')}>SORT</button>
                </div> 
                <div>
                    <label  >Search breed : </label>
                    <input className='input_search' name='title' placeholder='Breed...' value={state.title} onChange={(e) => handleChange(e)} />
                    
                    <button
                        className={`${!state.title?.length && "disabled"}`}
                        type="button" onClick={(e) => handleSubmit(e)}>SEARCH</button>
                </div>
            </form>
        </div>
    )
};

export default Search;
import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../Search/Search';
import {removegetDogsLoaded, } from '../../actions';
import Dog from '../Dog/Dog';
import './DogsLoaded.css';



const DogsLoaded = () =>{
    const dogsLoaded = useSelector( state => state.dogsLoaded)
    const dispatch = useDispatch();
    document.title='DogsLoaded'
    

    const handleSubmit =  (e) =>{
        e.preventDefault();
        dispatch(removegetDogsLoaded())
    }
    return(
        <div>
            <Search/>
            
            <ul className='container'>
            {
            dogsLoaded.map( dog =>(
                        <li className='dog'  key={dog.id}>
                        <Dog dog ={dog}/></li>
                    ))
            }
            </ul>
            <button type="button" onClick={ (e) => handleSubmit(e)}>Back to Home</button>
            <br></br>

        </div>
    )
}

export default DogsLoaded;
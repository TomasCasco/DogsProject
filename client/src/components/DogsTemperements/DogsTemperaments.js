import React  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../Search/Search';
import {  removedogsTemperaments } from '../../actions';
import Dog from '../Dog/Dog';




const DogsTemperaments = () =>{
    const dogsTemperaments = useSelector( state => state.dogsTemperaments)
    const dispatch = useDispatch();
    document.title='DogsTemperaments'
   

    const handleSubmit =  (e) =>{
        e.preventDefault();
        dispatch(removedogsTemperaments())
    }
    return(
        <>
            <Search/>
            <h1></h1>
        <div className='container'>
            {
                dogsTemperaments.map( dog =>(
                    <li className='dog' key={dog.id}>
                        <Dog dog ={dog}/>
 
                        </li>
                ))
            }
        </div>
        <button type="button" onClick={ (e) => handleSubmit(e)}>Ver Otras Razas</button>
        </>
    )
}

export default DogsTemperaments;
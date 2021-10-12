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
            <h1>Razas Encontradas por Temperamento</h1>
        <div className='container'>
            {
                dogsTemperaments.map( dog =>(
                    <li className='dog' key={dog.id}>
                        <Dog dog ={dog}/>
{/* 
                        <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
                        <br></br>
                        <img className="" src={dog.image} width="100" height="auto" alt="" />
                        <br></br>
                        <p>{dog.temperaments[0].name}</p>
                        <br></br>
                        <button onClick={ () => dispatch(addDogFavorite({ id: dog.id, name: dog.name, image: dog.image, temperaments: dog.temperaments[0].name, years : dog.years_life}))} >Favorite</button> */}
                    </li>
                ))
            }
        </div>
        <button type="button" onClick={ (e) => handleSubmit(e)}>Ver Otras Razas</button>
        </>
    )
}

export default DogsTemperaments;
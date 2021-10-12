import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllDogs,  } from '../../actions'
import Search from '../Search/Search';
import DogsLoaded from '../DogsLoaded/DogsLoaded';
import DogsTemperaments from '../DogsTemperements/DogsTemperaments';
import DogsOrder from '../DogsOrder/DogsOrder';
import Dog from '../Dog/Dog';
import './Home.css';


function Home(){
    const dispatch = useDispatch();
    const dogs = useSelector( state => state.dogs)
    const dogsLoaded = useSelector( state => state.dogsLoaded)
    const dogsTemperaments = useSelector( state => state.dogsTemperaments)
    const dogsOrder = useSelector( state => state.dogsOrder);

    document.title='Home'
    useEffect( () => {
        dispatch(getAllDogs())
      }, [])


    if(Array.isArray(dogsLoaded ) && dogsLoaded.length ) return <DogsLoaded/>      
    if(Array.isArray(dogsTemperaments ) && dogsTemperaments.length ) return <DogsTemperaments/>   
    if(dogsOrder)return <DogsOrder/>
    return (
        <div>
            <Search/>
            { dogsLoaded?.length && <h3>{dogsLoaded}</h3> }
            <ul className= 'container' >
                {
                    Array.isArray(dogs) ? dogs?.map( dog =>( dog &&
                        <li className='dog' key={dog.id}>
                            <Dog dog ={dog}/>
                             
                        </li>
                        
                    )) : <h1>Cargando...🏃‍♂️...🏋️‍♂️</h1>
                }
            </ul>

        </div>
    )
}

export default Home;
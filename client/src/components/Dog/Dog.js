import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDogFavorite } from '../../actions';
import './Dog.css';


const Dog = (dog) => {
    const dispatch = useDispatch();
    dog = dog?.dog

    const dogsFavorites = useSelector(state => state.dogsFavorites)


    const handleClick = (e) => {
        e.preventDefault()
        if (dog?.id && dog?.name && dog?.image && dog?.temperaments && dog?.years_life) {
            dispatch(addDogFavorite(
                {
                    id: dog?.id,
                    name: dog?.name,
                    image: dog?.image,
                    temperaments: [{ name: dog?.temperaments[0]?.name, }],
                    years: dog?.years_life
                }))
        }
    }
    const dogFovotite = dogsFavorites.map(d => d.id === dog.id).includes(true)

    return (
        <div className='dog_container'>
            <div>
                <Link className='link' to={`/dogs/${dog?.id}`}>{dog?.name}</Link>
                <Link className='' to={`/dogs/${dog?.id}`}>
                    <picture className='image_contain'>
                        <img className="dog_image" src={dog?.image} alt="" />
                    </picture>
                </Link>
            </div>
            <div className='dog_info'>
                {dog?.temperaments && <p>Temperaments:  {dog?.temperaments[0] ? dog?.temperaments[0]?.name : 'Esta raza no tiene temperamentos'}</p>}
                {dog?.years && <p>Life span: {dog?.years}</p>}
                {dog?.weight && <p>Weight: {dog?.weight}</p>}
                {dog?.height && <p>Height: {dog?.height}</p>}
                {(document.title !== 'Favorites' && document.title !== 'DogsOrder') && <button
                    className={`${dogFovotite && "disabled"}`}
                    onClick={(e) => handleClick(e)} >Add Favorite</button>}
            </div>
        </div>
    )
}

export default Dog;
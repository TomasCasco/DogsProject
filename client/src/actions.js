import axios from 'axios';
import { SET_DOGS, SET_DOG_DETAIL, REMOVE_DOG_FAVORITE, ADD_DOG_FAVORITE, GET_DOGS, ADD_DOG, GET_TEMPERAMENTS ,GET_DOG_TEMPERAMENTS, GET_DOG_ORDER} from './actionsNames';


export function getAllDogs(){
    return( dispatch) => {
        axios.get(`/dogs/`).then(response =>{
            dispatch( { type: SET_DOGS, payload: response.data})
        })
        .catch(error => {
            if(error.response?.status !== 404) alert('Algo salió mal 😅 no hay 🐕🐩🐕‍🦺🦮🐶')
            dispatch({ type: SET_DOGS, payload: null })
        })
    }
}
export function getDog(id){
    return( dispatch) => {
        axios.get(`/dogs/${id}`).then(response =>{
            dispatch( { type: SET_DOG_DETAIL, payload: response.data})
        }).catch(error => {
            if(error.response?.status !== 404) alert('Algo salió mal 😅 no hay 🐶')
            dispatch({ type: SET_DOG_DETAIL, payload: null })
        })
    }
}

export function getDogsLoaded(name) {
    return (dispatch) => {
       axios.get(`/dogs/?name=${name}`).then(response => {
          dispatch({ type: GET_DOGS, payload: response.data });
        }).catch(error =>{
            console.log('Error de getDogsLoaded',error)
        });
    };
  }


export function removegetDogsLoaded(){
    return ({ type: GET_DOGS, payload: undefined });

}

export function addDogFavorite(payload){
    return { type: ADD_DOG_FAVORITE, payload };
}

export function removeDogFavorite(id){
    return { type: REMOVE_DOG_FAVORITE, payload: id };
}



export function removedogsTemperaments(){
    return({ type: GET_DOG_TEMPERAMENTS, payload: undefined });
}

function imageDogRamdon(){
    const images = ['https://i.imgur.com/LmkqMNH.jpg', 'https://i.imgur.com/B0RzW0h.png','https://i.imgur.com/AO5T5hP.png']
    const randon = parseInt(Math.random()*3)
    return images[randon];
}
export function addDog (payload){
    payload.image =imageDogRamdon(); 
    return( dispatch) => {
        axios.post(`/dogs/`, payload)
        .then(response =>{
            dispatch( { type: ADD_DOG, payload: response.data})
        }).catch(error => {
            if(error.response?.status !== 404) alert('Algo salió mal 😅 no hay 🐶')
            dispatch({ type: ADD_DOG, payload: null })
        })
    }
    
}

export function clearDogsAdd(){
return { type: ADD_DOG, payload: undefined }
}



export function getTemperaments () {
    return (dispatch) => {
        axios.get(`/temperament`)
        .then(response => {
          dispatch({ type: GET_TEMPERAMENTS, payload: response.data });
        })
        .catch(error => console.log(error))
    }
}

export function getDogTemperament(name){
    return (dispatch) => {
        axios.get(`/temperament/?name=${name}`)
        .then(response => {
          dispatch({ type: GET_DOG_TEMPERAMENTS, payload: response.data });
        })
        .catch(error => console.log(error))
    }
}

export function getDogsOrder ({name, state}){
    return ({ type: GET_DOG_ORDER, payload: {name, state} });
}

export function removeDogsOrder (){
    return { type: GET_DOG_ORDER, payload: undefined};
}
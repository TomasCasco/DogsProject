import{ createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {SET_DOGS, SET_DOG_DETAIL, REMOVE_DOG_FAVORITE, ADD_DOG_FAVORITE, GET_DOGS, ADD_DOG, GET_TEMPERAMENTS, GET_DOG_TEMPERAMENTS, GET_DOG_ORDER} from './actionsNames';


const initialState ={
    dogs : undefined,
    dogDetail: undefined,
    dogsFavorites: [],
    dogsLoaded: undefined,
    dogsAdd: undefined,
    temperamentsDb: undefined,
    dogsTemperaments: undefined,
    dogsOrder: undefined,
}

function reducer(state=initialState, action){
    switch(action.type){
        case SET_DOGS:
            return { ...state, dogs: action.payload };

        case SET_DOG_DETAIL:
            return { ...state, dogDetail: action.payload };

        case ADD_DOG_FAVORITE:
            return {
                ...state,
                dogsFavorites: state.dogsFavorites.concat(action.payload)
              };
        case GET_DOGS:
            return{ ...state, dogsLoaded: action.payload };
        case REMOVE_DOG_FAVORITE:
            return {
                ...state,
                dogsFavorites: state.dogsFavorites?.filter(dog => dog.id !== action.payload)
              };
        case ADD_DOG:
            return { ...state, dogsAdd: action.payload }

        case GET_TEMPERAMENTS:
            return {...state, temperamentsDb: action.payload }

        case GET_DOG_TEMPERAMENTS:
            return {...state, dogsTemperaments: action.payload }
        
        case GET_DOG_ORDER:
            return {...state, dogsOrder: action.payload }

        default:
            return state;
    }
}

const store = createStore(reducer,applyMiddleware(thunk));

export default store; 
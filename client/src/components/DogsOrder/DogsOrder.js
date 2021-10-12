import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {UseOrderDogs} from './UseOrderDogs';

import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';


function quickSort(array) {
    
    let left = []
    let rigth = []
    if (array.length < 2) return array;
    for (let i = 1; i < array.length; i++) {
        parseInt(array[i].weight.split(' ')[0]) > parseInt(array[0].weight.split(' ')[0]) ? rigth.push(array[i]) : left.push(array[i]);
    }
    return quickSort(left).concat(array[0]).concat(quickSort(rigth));
}

function alfReverse(array){
    const resp = []
    for(let i = array.length -1; i>=0; i--){
        resp.push(array[i])
    }
    return resp
}

const DogsOrder = () =>{

    const  [dogOrderHook] = UseOrderDogs()  
    document.title = 'DogsOrder';
    const dispatch = useDispatch()
    const {name, state} = useSelector( state => state.dogsOrder);
    let response = []
     if(name){
        switch(name){
            case 'alfabeto'://a-z
                state?
                    response= dogOrderHook 
                 :
                    response= alfReverse(dogOrderHook)
                break

            case 'peso'://min-max
                state?
                    response= quickSort(dogOrderHook)
                :
                    response= quickSort(dogOrderHook).reverse()
                break
            default:
                response = `error sorting breeds`

        }
    }


    return(
        <div>
            <Search/>
             <Pagination response={response}/>

            
        </div>
    )
}

export default DogsOrder;
  

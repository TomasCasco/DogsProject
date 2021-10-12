import axios from 'axios';
import {useEffect, useState} from 'react';
// import { useDispatch, useSelector} from 'react-redux';
// import {getDogsOrder} from './actions';


export const UseOrderDogs = () =>{
    // console.log('Order dogs: ' , state)//name=alfabeto peso state boolean
    const [data, setData] = useState([])

    useEffect( () => {
        const getData = async () => {
            const res = await axios.get('/dogs/?todas=true')
            const data = await res.data
            setData(data)
        }
        getData()
    }, []);

    return[data]

}

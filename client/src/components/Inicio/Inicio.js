import {NavLink} from 'react-router-dom';
import './Inicio.css';

export default function Inicio() {
    return (
        <section className="inicio">
            <div className="texcontainer">

             <NavLink to='/dogs' className="text_2"> Here you can find any dog breen in the Api</NavLink>
             <NavLink to='/dogs' className="text__" >Breeds Galery </NavLink>  
             
            </div>
            
            
        </section>
    )
}
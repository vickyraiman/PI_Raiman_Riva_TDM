import React from "react";
import { Link } from "react-router-dom";

function Menu(props){
    return(
        <li>
            <Link to = {props.elementos.ruta} >{props.elementos.nombre}</Link>
        </li>
    )
}

export default Menu;
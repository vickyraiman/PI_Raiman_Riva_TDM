import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

function Busqueda(props) {
    const [busqueda, setBusqueda] = useState("");
    
    function controlarCambios(event){
        setBusqueda(event.target.value);
    }


    function enviarForm(event){
        event.preventDefault(); 

        if (busqueda === "") {
            return;
        }

        props.history.push(`/searchresults/${busqueda}`); 
    }

        return(
            <form className="search-form" onSubmit={(event) => enviarForm(event)}>
                <input type="text" name="searchData" placeholder="Buscar..." value={busqueda} onChange={(event) => controlarCambios(event)} />
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>
        )
    }



export default withRouter(Busqueda);
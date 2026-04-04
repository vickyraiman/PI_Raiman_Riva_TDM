import React from 'react';

function Busqueda() {
    return (
        <form className="search-form" action="" method="GET">
            <input type="text" name="searchData" placeholder="Buscar..." />
            <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
    )
}

export default Busqueda;
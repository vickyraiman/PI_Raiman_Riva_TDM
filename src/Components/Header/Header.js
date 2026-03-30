import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
    let session = localStorage.getItem("user");
    return(
    <header>
        <div className="logo-container">
            <img className="logo" src="img/CineScope.jpg" alt=""/>
        </div>
        <nav>
            <ul className="Navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/peliculas">Películas</Link></li>
            <li><Link to="/series">Series</Link></li>
            {session ?(
                <li>
                    <Link to="favoritas">Favoritas</Link>
                </li>
            ):(
                <div>
                    <li>
                        <Link to="/register">Registro</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            )}
            </ul>
        </nav>
    </header>
    );
}

export default Header;
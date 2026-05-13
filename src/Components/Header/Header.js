import { useEffect, useState } from "react";
import React from "react";
import { Link, withRouter } from "react-router-dom"
import Cookies from "universal-cookie";
const cookies = new Cookies();


function Header(props) {
    const [cookie, setCookie] = useState(cookies.get("user-cookie"));
    const [UsuarioLogueado, setUsuarioLogueado] = useState(cookies.get("user-cookie"));


    useEffect(() => {
        if (cookie !== cookies.get("user-cookie")) {
            setCookie(cookies.get("user-cookie"));
            setUsuarioLogueado(cookies.get("user-cookie"))
        }
    }, [cookie]);

    function cerrarSesion() {
        cookies.remove("user-cookie");
        setCookie(cookies.get("user-cookie"));
    }

    return (
        <React.Fragment>
            <div className="logo-container">
                <img className="logo" src="/img/logo.jpg" alt="" />
            </div>
            <nav>
                {UsuarioLogueado ?
                    <ul className="nav nav-tabs my-4">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Peliculas">Peliculas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Series">Series</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Favoritas">Favoritas</Link></li>
                        <button className="nav-link" onClick={() => cerrarSesion()}>Logout</button>
                    </ul>
                    :
                    <ul className="nav nav-tabs my-4">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Peliculas">Peliculas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Series">Series</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Registro">Registro</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/Login">Login</Link></li>
                    </ul>
                }
            </nav>
        </React.Fragment>
    )
}

export default Header;
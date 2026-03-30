import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import CrearCuenta from "../../Screens/CrearCuenta/CrearCuenta";

function Header(props) {
    let elementos = [
        { nombre: "Home", ruta: "/" },
        { nombre: "Películas", ruta: "/peliculas" },
        { nombre: "Series", ruta: "/series" },
        { nombre: "Favoritas", ruta: "./Favoritas" },
        { nombre: "Registro", ruta: "./Registro" },
        { nombre: "Login", ruta: "./Login" }
    ]
    return (
        <header>
            <div className="logo-container">
                <img className="logo" src="img/CineScope.jpg" alt="" />
            </div>
            <nav>
                <ul className="nav nav-tabs my-4">
                    {elementos.map((elementos, idx) => (
                        <Menu key={idx} elementos={elementos} />
                    ))}
                </ul>
                
            </nav>
        </header>
    );
}

export default Header;
import React from "react";
import Menu from "../Menu/Menu";
import Cookies from "universal-cookie";

const cookies = new Cookies();
let usuarioLogueado = cookies.get("user-cookie");

function Header(props) {
    let elementos = [
        { nombre: "Home", ruta: "/" },
        { nombre: "Películas", ruta: "/Peliculas" },
        { nombre: "Series", ruta: "/Series" },
        { nombre: "Favoritas", ruta: "/Favoritas" },
        { nombre: "Registro", ruta: "/Registro" },
        { nombre: "Login", ruta: "/Login" }
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
                    {usuarioLogueado ? <p className="usuario-logueado">{usuarioLogueado}</p> : null}
                    

            </nav>
        </header>
    );
}

export default Header;
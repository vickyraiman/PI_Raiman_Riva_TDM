import React from "react";
import {Link, withRouter} from "react-router-dom"
import Cookies from "universal-cookie";
const cookies = new Cookies();



class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cookie: cookies.get("user-cookie")
        }
    }

    componentDidUpdate() {
        if (this.state.cookie !== cookies.get("user-cookie")) {
            this.setState({
                cookie: cookies.get("user-cookie")
            });
        }
    }

    cerrarSesion() {
        cookies.remove("user-cookie");
        this.setState({
            cookie: cookies.get("user-cookie")})
    }

    render() {
        let usuarioLogueado = cookies.get("user-cookie");
        return (
            <React.Fragment>
                <div className="logo-container">
                    <img className="logo" src="img/CineScope.jpg" alt="" />
                </div>
                <nav>
                    {usuarioLogueado ?
                        <ul className="nav nav-tabs my-4">
                            <li className= "nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className= "nav-item"><Link className="nav-link" to="/Peliculas">Peliculas</Link></li>
                            <li className= "nav-item"><Link className="nav-link" to="/Series">Series</Link></li>
                            <li className= "nav-item"><Link className="nav-link" to="/Favoritas">Favoritas</Link></li>
                            <button className="nav-link" onClick={() => this.cerrarSesion()}>Logout</button>
                        </ul>
                        :
                        <ul className= "nav nav-tabs my-4">
                            <li className= "nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className= "nav-item"><Link className="nav-link" to="/Peliculas">Peliculas</Link></li>
                            <li className= "nav-item"><Link className="nav-link" to="/Series">Series</Link></li>
                            <li className= "nav-item"><Link className="nav-link" to="/Registro">Registro</Link></li>
                            <li className= "nav-item"><Link className="nav-link" to="/Login">Login</Link></li>
                        </ul>
                        }
                </nav>
            </React.Fragment>
        )
    }
}

export default Header;
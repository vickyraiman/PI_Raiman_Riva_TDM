import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Login from "../Login/Login";

const cookies = new Cookies();

class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    evitarSubmit(event) {
    event.preventDefault();

    let usuariosStorage = localStorage.getItem("usuarios");
    let usuarios = [];

    if (usuariosStorage !== null) {
        usuarios = JSON.parse(usuariosStorage);
    }

    let usuarioRepetido = usuarios.filter(
        (usuario) => usuario.email === this.state.email
    );

    if (this.state.email === "" || this.state.password === "") {
        alert("Por favor, complete todos los campos.");
    } 
    else if (usuarioRepetido.length > 0) {
        alert("El email ya está en uso");
    } 
    else if (this.state.password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
    } 
    else {
        let nuevoUsuario = {
            email: this.state.email,
            password: this.state.password
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        if (nuevoUsuario) {
          cookies.set("user-cookie", nuevoUsuario.email)
        }
        

        alert("Registro exitoso");

        this.props.history.push("/login");

        this.setState({ email: "", password: "" });
    }
}

controlarCambiosEmail(event) {
    this.setState({ email: event.target.value });
}

controlarCambiosPassword(event) {
    this.setState({ password: event.target.value });
}

    render() {
        return (
            <div>
                <h2 className="alert alert-primary">Registro</h2>
                <div className="row justify-content-center"></div>
                <div className='col-md-6'>
                    <form onSubmit={(event) => this.evitarSubmit(event)}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={(event) => this.controlarCambiosEmail(event)} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={(event) => this.controlarCambiosPassword(event)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Registrarse</button>
                    </form>

                </div>
            </div>


        );
    }

}


export default Registro;
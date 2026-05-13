import { useEffect , useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Header from "../../Components/Header/Header";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Registro(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function evitarSubmit(event) {
        event.preventDefault();

    let usuariosStorage = localStorage.getItem("usuarios");
    let usuarios = [];

    if (usuariosStorage !== null) {
        usuarios = JSON.parse(usuariosStorage);
    }

    let usuarioRepetido = usuarios.filter(
        (usuario) => usuario.email === email
    );

    if (email === "" || password === "") {
        alert("Por favor, complete todos los campos.");
    } 
    else if (usuarioRepetido.length > 0) {
        alert("El email ya está en uso");
    } 
    else if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
    } 
    else {
        let nuevoUsuario = {
            email: email,
            password: password
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        if (nuevoUsuario) {
          cookies.set("user-cookie", nuevoUsuario.email)
        }
        

        alert("Registro exitoso");

        props.history.push("/login");

        setEmail("");
        setPassword("");
    }
}

function controlarCambiosEmail(event) {
    setEmail(event.target.value);
}

function controlarCambiosPassword(event) {
    setPassword(event.target.value);
}

    return (
        <div>
                <Header/>
                <h2 className="alert alert-primary">Registro</h2>
                <div className="row justify-content-center"></div>
                <div className='col-md-6'>
                    <form onSubmit={(event) => evitarSubmit(event)}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" value={email} onChange={(event) => controlarCambiosEmail(event)} />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" value={password} onChange={(event) => controlarCambiosPassword(event)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Registrarse</button>
                    </form>

                </div>
            </div>


        );
    }




export default Registro;
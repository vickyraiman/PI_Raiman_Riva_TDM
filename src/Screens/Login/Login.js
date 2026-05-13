import React from "react";
import Header from '../../Components/Header/Header';
import { useEffect , useState } from "react";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function evitarSubmit(event) {
        event.preventDefault();

        let usuariosStorage = localStorage.getItem("usuarios");
        let usuarios = [];

        if (usuariosStorage !== null) {
            usuarios = JSON.parse(usuariosStorage);
        }

        let usuarioExistente = usuarios.filter(
            (usuario) => usuario.email === email
        )[0];

        if (usuarioExistente === undefined || usuarioExistente.password !== password) {
            alert("Credenciales incorrectas");
        } else {
            localStorage.setItem("usuarioLogueado", email);
            alert("Inicio de sesión exitoso");
            props.history.push("/");
        }
    }

    return (
            <div>
                <Header/>
                <h2 className="alert alert-primary">Iniciar sesión</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={(event) => evitarSubmit(event)}>
                            <div className="form-group">
                                <label>Email:</label>
                            <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} ></input>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} ></input>
                        </div>

                            <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                        </form>
                </div>
            </div>
            </div>
        )
    }


export default Login;


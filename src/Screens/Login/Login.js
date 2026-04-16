import React from "react";
import Header from '../../Components/Header/Header';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            email: "", 
            password: ""
        };
    }
    evitarSubmit(event) {
        event.preventDefault();

        let usuariosStorage = localStorage.getItem("usuarios");
        let usuarios = [];

        if (usuariosStorage !== null) {
            usuarios = JSON.parse(usuariosStorage);
        }

        let usuarioExistente = usuarios.filter(
            (usuario) => usuario.email === this.state.email
        )[0];

        if (usuarioExistente === undefined || usuarioExistente.password !== this.state.password) {
            alert("Credenciales incorrectas");
        } else {
            localStorage.setItem("usuarioLogueado", this.state.email);
            alert("Inicio de sesión exitoso");
            this.props.history.push("/");
        }
    }
    
    render() {
        return (
            <div>
                <Header/>
                <h2 className="alert alert-primary">Iniciar sesión</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={(event) => this.evitarSubmit(event)}>
                            <div className="form-group">
                                <label>Email:</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} ></input>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} ></input>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default Login;


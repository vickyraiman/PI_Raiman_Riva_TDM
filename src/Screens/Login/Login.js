import React from "react";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
    }
    evitarSubmit(event) {
        event.preventDefault();
    }
    
    render() {
        return (
            <div className="row justify-content-center">
                <div className = "col-md-6">
                    <form>
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
        )
    }
}

export default Login;


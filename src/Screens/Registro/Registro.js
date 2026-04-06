import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
    }
    evitarSubmit(event) {
        event.preventDefault();
    }
    controlarCambiosEmail(event) {
        this.setState({ email: event.target.value });
    }
    controlarCambiosPassword(event) {
        this.setState({ password: event.target.value });
    }

    

    render() {
        return (
            <div className="row justify-content-center">
                <h2 className="alert alert-primary">Registro</h2>
                <div className="col-md-6">
                    <form onSubmit={(event) => this.evitarSubmit(event)}>
                        
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={(event) => this.controlarCambiosEmail(event)} ></input>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={(event) => this.controlarCambiosPassword(event)} ></input>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                    </form>
                </div>
            </div>


        )
    }
}

export default Registro;
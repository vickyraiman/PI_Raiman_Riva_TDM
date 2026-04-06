import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Busqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: ''
        };
    }

    controlarCambios(event){
        this.setState({
            busqueda: event.target.value
        });
    }

    enviarForm(event){
        event.preventDefault();

        if (this.state.busqueda === "") {
            return;
        }

        this.props.history.push(`/searchresults/${this.state.busqueda}`);
    }

    render(){
        return(
            <form className="search-form" onSubmit={(event) => this.enviarForm(event)}>
                <input type="text" name="searchData" placeholder="Buscar..." value={this.state.busqueda} onChange={(event) => this.controlarCambios(event)} />
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>
        )
    }
}


export default withRouter(Busqueda);
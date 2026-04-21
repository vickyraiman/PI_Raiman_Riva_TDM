import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Loader from "../../Components/Loader/Loader";

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

class Series extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [],
            seriesOriginales: [],
            pagina: 1,
            busqueda: "",
            cargando: true,
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({
                series: data.results,
                seriesOriginales: data.results,
                pagina: this.state.pagina + 1,
                cargando: false,
            }))
            .catch(error => console.log(error));
    }

    cargarMas() {
       fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}&page=${this.state.pagina}`)
            .then(response => response.json())
            .then(data => this.setState({
                series: this.state.series.concat(data.results),
                seriesOriginales: this.state.seriesOriginales.concat(data.results),
                pagina: this.state.pagina + 1,
                cargando: false,
            }))
            .catch(error => console.log(error));
    }

    controlarCambios(event) {
        let valor = event.target.value;

        this.setState({
            busqueda: valor
        });

        let seriesFiltradas = this.state.seriesOriginales.filter(function (unaSerie) {
            return valor === "" || unaSerie.name.toLowerCase().includes(valor.toLowerCase());
        });

        this.setState({
            series: seriesFiltradas,
        });
    }

    evitarSubmit(event) {
        event.preventDefault();
    };

    render() {
        if (this.state.cargando) {
            return (
                <div>
                    <Header />
                    <Loader />
                </div>
            );
        }

        return (
            <div>

                <div className="container">
                <Header />
                    
                    <h2 className="alert alert-primary">Series Mejor Valoradas</h2>
                    <form onSubmit={(event) => this.evitarSubmit(event)} className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => this.controlarCambios(event)}
                            values={this.state.busqueda}
                            placeholder="Ingrese el nombre de la serie"
                        />
                    </form>

                    <section className="row cards">
                        {this.state.series.length > 0 ? (
                            this.state.series.map((serie, idx) => (
                                <Card
                                    key={serie.id + idx}
                                    id={serie.id}
                                    titulo={serie.name}
                                    descripcion={serie.overview}
                                    imagen={serie.poster_path}
                                    tipo="serie"
                                />
                            ))
                        ) : (
                            <p>No se encontraron series.</p>
                        )}
                    </section>

                        <button onClick={() => this.cargarMas()} className="btn btn-success mb-4">
                            Cargar Más
                        </button>

                </div>
            </div>
        );
    }
}

export default Series;

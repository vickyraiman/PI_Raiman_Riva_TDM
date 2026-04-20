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
            cantidadMostrada: 4,
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
                cargando: false,
            }))
            .catch(error => console.log(error));
    }

    cargarMas() {
        this.setState({
            cantidadMostrada: this.state.cantidadMostrada + 4,
        });
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
            cantidadMostrada: 4,
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
                <Header />

                <div className="container">
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
                            this.state.series.slice(0, this.state.cantidadMostrada).map((serie, idx) => (
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

                    {this.state.cantidadMostrada < this.state.series.length ? (
                        <button onClick={() => this.cargarMas()} className="btn btn-success mb-4">
                            Cargar Más
                        </button>
                    ) : null}

                </div>
            </div>
        );
    }
}

export default Series;

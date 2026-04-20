import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Loader from "../../Components/Loader/Loader";

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            peliculasOriginales: [],
            cantidadMostrada: 4,
            busqueda: "",
            cargando: true,
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({
                peliculas: data.results,
                peliculasOriginales: data.results,
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

        let peliculasFiltradas = this.state.peliculasOriginales.filter(function (unaPelicula) {
            return valor === "" || unaPelicula.title.toLowerCase().includes(valor.toLowerCase());
        });

        this.setState({
            peliculas: peliculasFiltradas,
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
                    <h2 className="alert alert-primary">Peliculas Mejor Valoradas</h2>
                    <form onSubmit={(event) => this.evitarSubmit(event)} className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => this.controlarCambios(event)}
                            values={this.state.busqueda}
                            placeholder="Ingrese el nombre de la película"
                        />
                    </form>

                    <section className="row cards">
                        {this.state.peliculas.length > 0 ? (
                            this.state.peliculas.slice(0, this.state.cantidadMostrada).map((pelicula, idx) => (
                                <Card
                                    key={pelicula.id + idx}
                                    id={pelicula.id}
                                    titulo={pelicula.title}
                                    descripcion={pelicula.overview}
                                    imagen={pelicula.poster_path}
                                    tipo="pelicula"
                                />
                            ))
                        ) : (
                            <p>No se encontraron películas.</p>
                        )}
                    </section>

                    {this.state.cantidadMostrada < this.state.peliculas.length ? (
                        <button onClick={() => this.cargarMas()} className="btn btn-success mb-4">
                            Cargar Más
                        </button>
                    ) : null}

                </div>
            </div>
        );
    }
}

export default Peliculas;

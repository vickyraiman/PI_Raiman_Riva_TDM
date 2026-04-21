import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            esFavorito: false,
            mostrarDescripcion: false,
        };
    }

    componentDidMount() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"));
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"));

        if (this.props.tipo === "pelicula") {
            if (arrayFavoritosPelicula === null) {
                arrayFavoritosPelicula = [];
            }
            this.setState({
                esFavorito: arrayFavoritosPelicula.includes(this.props.id),
            });
        } else if (this.props.tipo === "serie") {
            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }
            this.setState({
                esFavorito: arrayFavoritosSerie.includes(this.props.id),
            });
        }
    }

    cambiarDescripcion() {
        this.setState({ mostrarDescripcion: !this.state.mostrarDescripcion });
    }

    agregarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"));
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"));

        if (this.props.tipo === "pelicula") {
            if (arrayFavoritosPelicula === null) {
                arrayFavoritosPelicula = [];
            }
            if (!arrayFavoritosPelicula.includes(this.props.id)) {
                arrayFavoritosPelicula.push(this.props.id);
            }
            localStorage.setItem("favoritosPelicula", JSON.stringify(arrayFavoritosPelicula));

        } else if (this.props.tipo === "serie") {
            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }
            if (!arrayFavoritosSerie.includes(this.props.id)) {
                arrayFavoritosSerie.push(this.props.id);
            }
            localStorage.setItem("favoritosSerie", JSON.stringify(arrayFavoritosSerie));
        }

        this.setState({
            esFavorito: true,
        });
    }

    quitarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"));
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"));

        if (this.props.tipo === "pelicula") {
            if (arrayFavoritosPelicula === null) {
                arrayFavoritosPelicula = [];
            }

            let filtrados = arrayFavoritosPelicula.filter((id) => id !== this.props.id);
            localStorage.setItem("favoritosPelicula", JSON.stringify(filtrados));

        } else if (this.props.tipo === "serie") {
            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }

            let filtrados = arrayFavoritosSerie.filter((id) => id !== this.props.id);
            localStorage.setItem("favoritosSerie", JSON.stringify(filtrados));
        }

        this.setState({
            esFavorito: false,
        });
    }

    render() {
        let rutaDetalle = "";
        let usuarioLogueado = cookies.get("user-cookie");
        if (this.props.tipo === 'pelicula') {
            rutaDetalle = `/pelicula/${this.props.id}`;
        } else if (this.props.tipo === 'serie') {
            rutaDetalle = `/serie/${this.props.id}`;
        }

        return (
            <article className="single-card-movie">
                <img src={"https://image.tmdb.org/t/p/w342/" + this.props.imagen} className="card-img-top"
                    alt={this.props.titulo} />

                <div className="cardBody">
                    <h5 className="card-title">{this.props.titulo}</h5>
                    <button onClick={() => this.cambiarDescripcion()} className="btn btn-info">
                        {this.state.mostrarDescripcion ? "Ocultar Descripción" : "Mostrar Descripción"}
                    </button>
                    {this.state.mostrarDescripcion ? (<p className="card-text">{this.props.descripcion}</p>) : null}
                    <Link to={rutaDetalle}>
                        <button className="btn btn-primary">Ver Más</button>
                    </Link>

                    {usuarioLogueado ? (
                        this.state.esFavorito ? (
                            <button onClick={() => this.quitarFavoritos()} className="btn btn-secondary">
                                ❤️
                            </button>
                        ) : (
                            <button onClick={() => this.agregarFavoritos()} className="btn btn-secondary">
                                🩶
                            </button>
                        )
                    ) : null}
                </div>
            </article>
        );
    }
}

export default Card;
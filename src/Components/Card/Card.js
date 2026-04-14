import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            esFavorito: false,
            mostrarDescripcion: false,
        };
    }

    cambiarDescripcion() {
        this.setState({ mostrarDescripcion: !this.state.mostrarDescripcion });
    }

    agregarFavoritos() {

        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"))
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"))
        this.setState({
            esFavorito: !this.state.esFavorito,
        });

        if (this.props.tipo === "pelicula") {
            if (arrayFavoritosPelicula === null) {
                arrayFavoritosPelicula = [];
            }
            arrayFavoritosPelicula.push(this.props.id);
            localStorage.setItem("favoritosPelicula", JSON.stringify(arrayFavoritosPelicula));
        } else if (this.props.tipo === "serie") {
            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }
            arrayFavoritosSerie.push(this.props.id);
            localStorage.setItem("favoritosSerie", JSON.stringify(arrayFavoritosSerie));
        }
    }

    render() {
        let rutaDetalle = "";
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
                    <button onClick={() => this.agregarFavoritos()} className="btn btn-secondary">
                        {this.state.esFavorito ? "❤️" : "🩶"}
                    </button>
                </div>
            </article>
        );
    }
}

export default Card;
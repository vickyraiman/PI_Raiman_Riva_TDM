import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Card(props) {
    const [esFavorito, setEsFavorito] = useState(false);
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

    useEffect(() => {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"));
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"));

        if (props.tipo === "pelicula") {
            if (arrayFavoritosPelicula === null) {
                arrayFavoritosPelicula = [];
            }
            setEsFavorito(arrayFavoritosPelicula.includes(props.id));
        } else if (props.tipo === "serie") {
            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }
            setEsFavorito(arrayFavoritosSerie.includes(props.id));
        }
    }, []);
    

    function cambiarDescripcion() {
        setMostrarDescripcion(!mostrarDescripcion);
    }

    function agregarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"));
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"));

        if (props.tipo === "pelicula") {
            if (arrayFavoritosPelicula === null) {
                arrayFavoritosPelicula = [];
            }
            if (!arrayFavoritosPelicula.includes(props.id)) {
                arrayFavoritosPelicula.push(props.id);
            }
            localStorage.setItem("favoritosPelicula", JSON.stringify(arrayFavoritosPelicula));

        } else if (props.tipo === "serie") {
            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }
            if (!arrayFavoritosSerie.includes(props.id)) {
                arrayFavoritosSerie.push(props.id);
            }
            localStorage.setItem("favoritosSerie", JSON.stringify(arrayFavoritosSerie));
        }

        setEsFavorito(true);
    }

    function quitarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"));
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"));

        if (props.tipo === "pelicula") {
            if (arrayFavoritosPelicula === null) {
                arrayFavoritosPelicula = [];
            }

            let filtrados = arrayFavoritosPelicula.filter((id) => id !== id);
            localStorage.setItem("favoritosPelicula", JSON.stringify(filtrados));

        } else if (props.tipo === "serie") {
            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }

            let filtrados = arrayFavoritosSerie.filter((id) => id !== id);
            localStorage.setItem("favoritosSerie", JSON.stringify(filtrados));
        }

        setEsFavorito(false);
    }

        let rutaDetalle = "";
        let usuarioLogueado = cookies.get("user-cookie");
        if (props.tipo === 'pelicula') {
            rutaDetalle = `/pelicula/${props.id}`;
        } else if (props.tipo === 'serie') {
            rutaDetalle = `/serie/${props.id}`;
        }

        return (
            <article className="single-card-movie">
                <img src={"https://image.tmdb.org/t/p/w342/" + props.imagen} className="card-img-top"
                    alt={props.titulo} />

                <div className="cardBody">
                    <h5 className="card-title">{props.titulo}</h5>
                    <button onClick={() => cambiarDescripcion()} className="btn btn-info">
                        {mostrarDescripcion ? "Ocultar Descripción" : "Mostrar Descripción"}
                    </button>
                    {mostrarDescripcion ? (<p className="card-text">{props.descripcion}</p>) : null}
                    <Link to={rutaDetalle}>
                        <button className="btn btn-primary">Ver Más</button>
                    </Link>

                    {usuarioLogueado ? (
                        esFavorito ? (
                            <button onClick={() => quitarFavoritos()} className="btn btn-secondary">
                                ❤️
                            </button>
                        ) : (
                            <button onClick={() => agregarFavoritos()} className="btn btn-secondary">
                                🩶
                            </button>
                        )
                    ) : null}
                </div>
            </article>
        );
    }


export default Card;
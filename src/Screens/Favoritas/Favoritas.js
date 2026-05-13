import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"

const cookies = new Cookies()
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

function Favoritas(props) {
    const [peliculasFavoritas, setPeliculasFavoritas] = useState([]);
    const [seriesFavoritas, setSeriesFavoritas] = useState([]);
    const [cargandoPeliculas, setCargandoPeliculas] = useState(true);
    const [cargandoSeries, setCargandoSeries] = useState(true);
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);


function cambiarDescripcion() {
    setMostrarDescripcion(!mostrarDescripcion);
}

useEffect(() => {
    let favoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"))
    let favoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"))

    if (favoritosPelicula === null) {
        favoritosPelicula = []
    }
    if (favoritosSerie === null) {
        favoritosSerie = []
    }

    if (favoritosPelicula.length === 0) {
        setPeliculasFavoritas([]);
        setCargandoPeliculas(false);
    } else {
        let peliculas = []
        favoritosPelicula.map((id) =>
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
                .then(response => response.json())
                .then(data => {
                    peliculas.push(data)
                    setPeliculasFavoritas(peliculas);
                    setCargandoPeliculas(false);
                })
                .catch(error => console.log(error))
        );
    }

    if (favoritosSerie.length === 0) {
        setSeriesFavoritas([]);
        setCargandoSeries(false);
    } else {
        let series = []
        favoritosSerie.map((id) =>
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apikey}`)
                .then(response => response.json())
                .then(data => {
                    series.push(data)
                    setSeriesFavoritas(series);
                    setCargandoSeries(false);
                })
                .catch(error => console.log(error))
        );
    }
})

function sacarFavorito(id, tipo) {

    if (tipo === "pelicula") {

        let favoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"))

        if (favoritosPelicula === null) {
            favoritosPelicula = []
        }

        let filtrados = favoritosPelicula.filter(function (unId) {
            return unId !== id
        })

        localStorage.setItem("favoritosPelicula", JSON.stringify(filtrados))

        let peliculasActualizadas = peliculasFavoritas.filter(function (unaPelicula) {
            return unaPelicula.id !== id
        })

        setPeliculasFavoritas(peliculasActualizadas);

    } else if (tipo === "serie") {
        let favoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"))

        if (favoritosSerie === null) {
            favoritosSerie = []
        }

        let filtrados = favoritosSerie.filter(function (unId) {
            return unId !== id
        })

        localStorage.setItem("favoritosSerie", JSON.stringify(filtrados))

        let seriesActualizadas = seriesFavoritas.filter(function (unaSerie) {
            return unaSerie.id !== id
        })

        setSeriesFavoritas(seriesActualizadas);
    }


    return (
        <div>
            <Header />

            <div className="container">
                <h2 className="alert alert-primary">Películas favoritas</h2>

                {cargandoPeliculas ? (
                    <h3>Cargando...</h3>
                ) : peliculasFavoritas.length === 0 ? (
                    <p>No tenés películas favoritas guardadas.</p>
                ) : (
                    <section className="row cards">
                        {peliculasFavoritas.map((pelicula, idx) => (
                            <article className="single-card-movie" key={pelicula.id + idx}>
                                <img
                                    src={"https://image.tmdb.org/t/p/w342/" + pelicula.poster_path}
                                    className="card-img-top"
                                    alt={pelicula.title}
                                />

                                <div className="cardBody">
                                    <h5 className="card-title">{pelicula.title}</h5>
                                    <button onClick={() => cambiarDescripcion()} className="btn btn-info">
                                        {mostrarDescripcion ? "Ocultar Descripción" : "Mostrar Descripción"}
                                    </button>
                                    {mostrarDescripcion ? (<p className="card-text">{pelicula.overview}</p>) : null}
                                    <Link to={`/pelicula/${pelicula.id}`}>
                                        <button className="btn btn-primary">Ver más</button>
                                    </Link>

                                    <button
                                        onClick={() => sacarFavorito(pelicula.id, "pelicula")}
                                        className="btn btn-danger"
                                    >
                                        Quitar de favoritos
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                )}

                <h2 className="alert alert-warning mt-4">Series favoritas</h2>

                {cargandoSeries ? (
                    <h3>Cargando...</h3>
                ) : seriesFavoritas.length === 0 ? (
                    <p>No tenés series favoritas guardadas.</p>
                ) : (
                    <section className="row cards">
                        {seriesFavoritas.map((serie, idx) => (
                            <article className="single-card-movie" key={serie.id + idx}>
                                <img
                                    src={"https://image.tmdb.org/t/p/w342/" + serie.poster_path}
                                    className="card-img-top"
                                    alt={serie.name}
                                />

                                <div className="cardBody">
                                    <h5 className="card-title">{serie.name}</h5>
                                    <button onClick={() => cambiarDescripcion()} className="btn btn-info">
                                        {mostrarDescripcion ? "Ocultar Descripción" : "Mostrar Descripción"}
                                    </button>
                                    {mostrarDescripcion ? (<p className="card-text">{serie.overview}</p>) : null}
                                    <Link to={`/serie/${serie.id}`}>
                                        <button className="btn btn-primary">Ver más</button>
                                    </Link>

                                    <button
                                        onClick={() => sacarFavorito(serie.id, "serie")}
                                        className="btn btn-danger"
                                    >
                                        Quitar de favoritos
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}
}

export default Favoritas
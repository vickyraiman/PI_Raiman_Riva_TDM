import React, {Component} from "react"
import Header from "../../Components/Header/Header"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie"

const cookies = new Cookies()
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

class Favoritas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculasFavoritas: [],
            seriesFavoritas: [],
            cargandoPeliculas: true,
            cargandoSeries: true,
        }
    }

    componentDidMount() {
        let favoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"))
        let favoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"))

        if (favoritosPelicula === null) {
            favoritosPelicula = []
        }
        if (favoritosSerie === null) {
            favoritosSerie = []
        }

        if (favoritosPelicula.length === 0) {
            this.setState({
                peliculasFavoritas: [],
                cargandoPeliculas: false,
            })
        }else{
            let peliculas = []
            favoritosPelicula.map((id)=>
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
                    .then(response => response.json())
                    .then(data => {
                        peliculas.push(data)
                        this.setState({
                            peliculasFavoritas: peliculas,
                            cargandoPeliculas: false,
                        })
                    })
                    .catch(error => console.log(error))
            );
        }

        if (favoritosSerie.length === 0) {
            this.setState({
                seriesFavoritas: [],
                cargandoSeries: false,
            })
        }else{
            let series = []
            favoritosSerie.map((id)=>
                fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apikey}`)
                    .then(response => response.json())
                    .then(data => {
                        series.push(data)
                        this.setState({
                            seriesFavoritas: series,
                            cargandoSeries: false,
                        })
                    })
                    .catch(error => console.log(error))
            );
        }
    }

    sacarFavorito(id, tipo) {
        if (tipo === "pelicula") {
            let favoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula"))

            if (favoritosPelicula === null) {
                favoritosPelicula = []
            }

            let filtrados = favoritosPelicula.filter(function(unId){
                return unId !== id
            })

            localStorage.setItem("favoritosPelicula", JSON.stringify(filtrados))

            let peliculasActualizadas = this.state.peliculasFavoritas.filter(function(unaPelicula){
                return unaPelicula.id !== id
            })

            this.setState({
                peliculasFavoritas: peliculasActualizadas,
            })

        } else if (tipo === "serie") {
            let favoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"))

            if (favoritosSerie === null) {
                favoritosSerie = []
            }

            let filtrados = favoritosSerie.filter(function(unId){
                return unId !== id
            })

            localStorage.setItem("favoritosSerie", JSON.stringify(filtrados))

            let seriesActualizadas = this.state.seriesFavoritas.filter(function(unaSerie){
                return unaSerie.id !== id
            })

            this.setState({
                seriesFavoritas: seriesActualizadas,
            })
        }
    }

    render() {
         return (
            <div>
                <Header />

                <div className="container">
                    <h2 className="alert alert-primary">Películas favoritas</h2>

                    {this.state.cargandoPeliculas ? (
                        <h3>Cargando...</h3>
                    ) : this.state.peliculasFavoritas.length === 0 ? (
                        <p>No tenés películas favoritas guardadas.</p>
                    ) : (
                        <section className="row cards">
                            {this.state.peliculasFavoritas.map((pelicula, idx) => (
                                <article className="single-card-movie" key={pelicula.id + idx}>
                                    <img
                                        src={"https://image.tmdb.org/t/p/w342/" + pelicula.poster_path}
                                        className="card-img-top"
                                        alt={pelicula.title}
                                    />

                                    <div className="cardBody">
                                        <h5 className="card-title">{pelicula.title}</h5>

                                        <Link to={`/pelicula/${pelicula.id}`}>
                                            <button className="btn btn-primary">Ver más</button>
                                        </Link>

                                        <button
                                            onClick={() => this.sacarFavorito(pelicula.id, "pelicula")}
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

                    {this.state.cargandoSeries ? (
                        <h3>Cargando...</h3>
                    ) : this.state.seriesFavoritas.length === 0 ? (
                        <p>No tenés series favoritas guardadas.</p>
                    ) : (
                        <section className="row cards">
                            {this.state.seriesFavoritas.map((serie, idx) => (
                                <article className="single-card-movie" key={serie.id + idx}>
                                    <img
                                        src={"https://image.tmdb.org/t/p/w342/" + serie.poster_path}
                                        className="card-img-top"
                                        alt={serie.name}
                                    />

                                    <div className="cardBody">
                                        <h5 className="card-title">{serie.name}</h5>

                                        <Link to={`/serie/${serie.id}`}>
                                            <button className="btn btn-primary">Ver más</button>
                                        </Link>

                                        <button
                                            onClick={() => this.sacarFavorito(serie.id, "serie")}
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
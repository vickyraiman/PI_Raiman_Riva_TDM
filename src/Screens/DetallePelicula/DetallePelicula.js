import React, { Component } from 'react';
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";
import Cookies from "universal-cookie";
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';
const cookies = new Cookies();


class Pelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null,
            esFavorito: false,
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                let favoritos = JSON.parse(localStorage.getItem("favoritosPelicula")) || [];

                this.setState({
                    pelicula: data,
                    esFavorito: favoritos.includes(data.id)
                });
            })
            .catch(error => console.log(error));

        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({
                genero: data.genres
            }))
            .catch(error => console.log(error))
    }
    agregarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula")) || [];

        if (!arrayFavoritosPelicula.includes(this.state.pelicula.id)) {
            arrayFavoritosPelicula.push(this.state.pelicula.id);
            localStorage.setItem("favoritosPelicula", JSON.stringify(arrayFavoritosPelicula));
        }

        this.setState({
            esFavorito: true,
        });
    }

    quitarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula")) || [];

        let filtrados = arrayFavoritosPelicula.filter(
            (id) => id !== this.state.pelicula.id
        );

        localStorage.setItem("favoritosPelicula", JSON.stringify(filtrados));

        this.setState({
            esFavorito: false,
        });
    }

    render() {
        let usuarioLogueado = cookies.get("user-cookie");
        if (this.state.pelicula === null) {
            return (
                <Loader />
            )
        }
        return (
            <div>
                <div className='container' >

                    <Header />
                    <h2 class="alert alert-primary">{this.state.pelicula.title}</h2>
                    <section className="row">
                        <img src={"https://image.tmdb.org/t/p/w342/" + this.state.pelicula.poster_path} className="col-md-6" alt={this.state.pelicula.title} />
                        <section className="col-md-6 info">
                            <h3>Sinópsis</h3>
                            <p className="description">{this.state.pelicula.overview}</p>
                            <p className='mt-0 mb-0' id='release-date'><strong>Fecha de estreno:</strong> {this.state.pelicula.release_date}</p>
                            <p className="mt-0 mb-0 " id="length"><strong>Duración:</strong> {this.state.pelicula.runtime} minutos</p>
                            <p className="mt-0" id="votes"><strong>Puntuación:</strong> {this.state.pelicula.vote_average}</p>
                            <p className="mt-0" id="votes"><strong>Genero:</strong>{this.state.pelicula.genres.map(genero => genero.name + ' ')}</p>

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
                        </section>
                    </section>
                </div>

            </div>

        )
    }
}

export default Pelicula;
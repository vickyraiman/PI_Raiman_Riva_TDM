import React, { Component } from 'react';
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";
import Cookies from "universal-cookie";

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';
const cookies = new Cookies();

class Serie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serie: null,
            esFavorito: false,
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({
                serie: data
            }))
            .catch(error => console.log(error));

        fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({
                genero: data.genres
            }))
            .catch(error => console.log(error))
    }

        agregarFavoritos() {

        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie"))
        this.setState({
            esFavorito: !this.state.esFavorito,
        });

            if (arrayFavoritosSerie === null) {
                arrayFavoritosSerie = [];
            }
            arrayFavoritosSerie.push(this.state.serie.id);
            localStorage.setItem("favoritosSerie", JSON.stringify(arrayFavoritosSerie));

            this.setState({
                esFavorito: true,
            });
    }


render(){
    let usuarioLogueado = cookies.get("user-cookie");
    if (this.state.serie === null) {
        return (
            <Loader/>
        )
    }
    return (
        <div>
            <Header/>
            <h2 class="alert alert-primary">{this.state.serie.name}</h2>
            <section className="row">
                <img src={"https://image.tmdb.org/t/p/w342/" + this.state.serie.poster_path} className="col-md-6" alt={this.state.serie.title} />
                <section className="col-md-6 info">
                    <h3>Sinópsis</h3>
                    <p className="description">{this.state.serie.overview}</p>
                    <p className='mt-0 mb-0' id='release-date'><strong>Fecha de estreno:</strong> {this.state.serie.first_air_date}</p>
                    <p className="mt-0" id="votes"><strong>Puntuación:</strong> {this.state.serie.vote_average}</p>
                    <p className="mt-0" id="votes"><strong>Genero:</strong>{this.state.serie.genres.map(genero => genero.name + ' ')}</p>
                    {usuarioLogueado ? (
                        <button onClick={() => this.agregarFavoritos()} className="btn btn-secondary">
                            {this.state.esFavorito ? "❤️" : "🩶"}
                        </button>
                    ) : null}
                </section>
            </section>

        </div>

    )
}
}
export default Serie;
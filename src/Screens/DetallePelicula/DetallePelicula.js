import React, { Component } from 'react';

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

class Pelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pelicula: null,
        };
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({
                pelicula: data
            }))
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.pelicula === null) {
            return (
                <div>
                    <img src="./img/cargando.gif" alt="Cargando..."></img>
                </div>
            )
        }
        return (
            <div>

                <h2 class="alert alert-primary">{this.state.pelicula.title}</h2>
                <section className="row">
                    <img src={"https://image.tmdb.org/t/p/w342/" + this.state.pelicula.poster_path} className="col-md-6" alt={this.state.pelicula.title} />
                    <section className="col-md-6 info">
                        <h3>Descripción</h3>
                        <p className="description">{this.state.pelicula.overview}</p>
                        <p className='mt-0 mb-0' id='release-date'><strong>Fecha de estreno:</strong>{this.state.pelicula.release_date}</p>
                        <p className="mt-0 mb-0 " id="length"><strong>Duración:</strong>{this.state.pelicula.runtime} </p>
                        <p className="mt-0" id="votes"><strong>Puntuación:</strong>{this.state.pelicula.vote_count} </p>
                    </section>
                </section>

            </div>

        )
    }
}

export default Pelicula;
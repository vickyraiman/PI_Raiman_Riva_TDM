import React, { Component } from 'react';
import Card from '../../Components/Card/Card';

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: [],
            series: [],
            
        };
    }

    componentDidMount() {
console.log('llega al didmount')
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${this.props.match.params.nombre}`)
            .then(response => response.json())
            .then(data => this.setState({
                peliculas: data.results
            }))
            .catch(error => console.log(error));

        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apikey}&query=${this.props.match.params.nombre}`)
            .then(response => response.json())
            .then(data => this.setState({
                series: data.results  
                
            }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
            <section className='cards'>
                {this.state.peliculas.length === 0 ? (
                    <h3>No hay resultados</h3>
                ) : (
                    this.state.peliculas.map((pelicula, idx) => (
                        <Card
                            key={pelicula.id}
                            id={pelicula.id}
                            titulo={pelicula.title}
                            descripcion={pelicula.overview}
                            imagen={pelicula.poster_path}
                            tipo='pelicula'
                        />
                    ))
                )}
            </section>
            <section className='cards'>
                {this.state.series.length === 0 ? (
                    <h3>No hay resultados</h3>
                ) : (
                    this.state.series.map((serie) => (
                        <Card
                            key={serie.id}
                            id={serie.id}
                            titulo={serie.name}
                            descripcion={serie.overview}
                            imagen={serie.poster_path}
                            tipo='serie'
                        />
                    ))
                )}
            </section>
            </div>
        
        );
    }
}

export default SearchResults;
import React, {Component} from "react";
import Card from '../Card/Card'
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f'
    
class SeccionPeliPopulares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas : []
        };
    }

    componentDidMount(){

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({ peliculas: data.results }))
            .catch(error => console.log(error));

    }

    render() {

        return (
            <section className="row cards" id="movies">
                <article className="single-card-movie">
                    {this.state.peliculas.map((pelicula) => (
                        <Card
                            key={pelicula.id}
                            id={pelicula.id}
                            titulo={pelicula.title}
                            descripcion={pelicula.overview}
                            imagen={pelicula.poster_path} 
                            tipo='pelicula'/>
                    ))}
                </article>
            </section>
        )
    }
}

export default SeccionPeliPopulares;
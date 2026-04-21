import React, {Component} from "react";
import Card from '../Card/Card';
import Loader from "../../Components/Loader/Loader";
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f'

class SeccionPeliNowPlaying extends Component{
    constructor(props){
        super(props);
        this.state = {
            peliculas: []
        };
    }

    componentDidMount(){

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({peliculas: data.results}))
            .catch(error => console.log(error));

    }

    render(){
        if (this.state.peliculas === null) {
            return (
                <Loader/>
            )
        }
        return(
            <section className="row cards" id="now-playing">
                    {this.state.peliculas.slice(0,4).map((pelicula)=>(
                        <Card
                            key={pelicula.id}
                            id={pelicula.id}
                            titulo={pelicula.title}
                            descripcion={pelicula.overview}
                            imagen={pelicula.poster_path}
                            tipo='pelicula'
                        />

                    ))}
            </section>
        )
    }
}

export default SeccionPeliNowPlaying;
import { useEffect , useState } from "react";
import React, {Component} from "react";
import Card from '../Card/Card';
import Loader from "../../Components/Loader/Loader";
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';
    

function SeccionPeliPopulares(params) {

    const [peliculas, setPeliculas] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => setPeliculas(data.results))
            .catch(error => console.log(error));

    }, []);
    if (peliculas === null) {
        return (
            <Loader/>
        )
    }
    return (
        <section className="row cards" id="movies">
                {peliculas.slice(0,4).map((pelicula) => (
                    <Card
                        key={pelicula.id}
                            id={pelicula.id}
                            titulo={pelicula.title}
                            descripcion={pelicula.overview}
                            imagen={pelicula.poster_path} 
                            tipo='pelicula'/>
                    ))}
            </section>
        )
    }


export default SeccionPeliPopulares;
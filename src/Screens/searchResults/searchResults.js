import React, { useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

function SearchResults(props) {
    const [peliculas, setPeliculas] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${props.match.params.nombre}`)
            .then(response => response.json())
            .then(data => {
                setPeliculas(data.results);
            })
            .catch(error => console.log(error));
    }
        , []);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apikey}&query=${props.match.params.nombre}`)
            .then(response => response.json())
            .then(data => {
                setSeries(data.results);
            })
            .catch(error => console.log(error));
    }, []);


    if (peliculas === null) {
        return (
            <Loader />
        )
    }
    if (series === null) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <Header />
            <section className='cards'>
                {peliculas.length === 0 ? (
                    <h3>No hay resultados</h3>
                ) : (
                    peliculas.map((pelicula) => (
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
                {series.length === 0 ? (
                    <h3>No hay resultados</h3>
                ) : (
                    series.map((serie) => (
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

export default SearchResults;
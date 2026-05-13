import React, { use, useEffect, useState } from 'react';
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";
import Cookies from "universal-cookie";
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';
const cookies = new Cookies();


function Pelicula(props) {

    const [pelicula, setPelicula] = useState(null);
    const [esFavorito, setEsFavorito] = useState(false);
    const [genero, setGenero] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                let favoritos = JSON.parse(localStorage.getItem("favoritosPelicula")) || [];
                setPelicula(data);
                setEsFavorito(favoritos.includes(data.id));
            })
            .catch(error => console.log(error));
    },
        []);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`)
            .then(response => response.json())
            .then(data =>
                setGenero(data.genres)
            )
            .catch(error => console.log(error));
    },
        []);

    function agregarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula")) || [];

        if (!arrayFavoritosPelicula.includes(pelicula.id)) {
            arrayFavoritosPelicula.push(pelicula.id);
            localStorage.setItem("favoritosPelicula", JSON.stringify(arrayFavoritosPelicula));
        }
        setEsFavorito(true);
    }

    function quitarFavoritos() {
        let arrayFavoritosPelicula = JSON.parse(localStorage.getItem("favoritosPelicula")) || [];

        let filtrados = arrayFavoritosPelicula.filter(
            (id) => id !== pelicula.id
        );

        localStorage.setItem("favoritosPelicula", JSON.stringify(filtrados));

        setEsFavorito(false);
    }


    let usuarioLogueado = cookies.get("user-cookie");
    if (pelicula === null) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <div className='container' >

                <Header />
                <h2 class="alert alert-primary">{pelicula.title}</h2>
                <section className="row">
                    <img src={"https://image.tmdb.org/t/p/w342/" + pelicula.poster_path} className="col-md-6" alt={pelicula.title} />
                    <section className="col-md-6 info">
                        <h3>Sinópsis</h3>
                        <p className="description">{pelicula.overview}</p>
                        <p className='mt-0 mb-0' id='release-date'><strong>Fecha de estreno:</strong> {pelicula.release_date}</p>
                        <p className="mt-0 mb-0 " id="length"><strong>Duración:</strong> {pelicula.runtime} minutos</p>
                        <p className="mt-0" id="votes"><strong>Puntuación:</strong> {pelicula.vote_average}</p>
                        <p className="mt-0" id="votes"><strong>Genero:</strong>{pelicula.genres.map(genero => genero.name + ' ')}</p>

                        {usuarioLogueado ? (
                            esFavorito ? (
                                <button onClick={() => quitarFavoritos()} className="btn btn-secondary">
                                    ❤️
                                </button>
                            ) : (
                                <button onClick={() => agregarFavoritos()} className="btn btn-secondary">
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


export default Pelicula;
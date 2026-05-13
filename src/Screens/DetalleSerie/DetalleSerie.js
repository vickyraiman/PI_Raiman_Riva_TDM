import React, { useState, useEffect } from 'react';
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";
import Cookies from "universal-cookie";

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';
const cookies = new Cookies();

function Serie(props) {
    const [serie, setSerie] = useState(null);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${props.match.params.id}?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                let favoritos = JSON.parse(localStorage.getItem("favoritosSerie")) || [];

                setSerie(data);
                setEsFavorito(favoritos.includes(data.id));
            })
            .catch(error => console.log(error));
    }, []);

    function agregarFavoritos() {
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie")) || [];

        if (!arrayFavoritosSerie.includes(serie.id)) {
            arrayFavoritosSerie.push(serie.id);
            localStorage.setItem("favoritosSerie", JSON.stringify(arrayFavoritosSerie));
        }

        setEsFavorito(true);
    }

    function quitarFavoritos() {
        let arrayFavoritosSerie = JSON.parse(localStorage.getItem("favoritosSerie")) || [];

        let filtrados = arrayFavoritosSerie.filter(
            (id) => id !== serie.id
        );

        localStorage.setItem("favoritosSerie", JSON.stringify(filtrados));

        setEsFavorito(false);
    }

    let usuarioLogueado = cookies.get("user-cookie");

    if (serie === null) {
        return (
            <Loader />
        );
    }

    return (
        <div>
            <Header />

            <h2 className="alert alert-primary">{serie.name}</h2>

            <section className="row">
                <img 
                    src={"https://image.tmdb.org/t/p/w342/" + serie.poster_path} 
                    className="col-md-6" 
                    alt={serie.name} 
                />

                <section className="col-md-6 info">
                    <h3>Sinópsis</h3>

                    <p className="description">{serie.overview}</p>

                    <p className="mt-0 mb-0" id="release-date">
                        <strong>Fecha de estreno:</strong> {serie.first_air_date}
                    </p>

                    <p className="mt-0" id="votes">
                        <strong>Puntuación:</strong> {serie.vote_average}
                    </p>

                    <p className="mt-0" id="votes">
                        <strong>Género:</strong> {serie.genres.map(genero => genero.name + ' ')}
                    </p>

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
    );
}

export default Serie;
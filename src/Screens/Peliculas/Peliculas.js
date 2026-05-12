import React from "react";
import {useEffect, useState} from 'react';
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Loader from "../../Components/Loader/Loader";

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

function Peliculas() {

    const [peliculas, setPeliculas] = useState([]);
    const [peliculasOriginales, setPeliculasOriginales] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                    setPeliculas(data.results);
                    setPeliculasOriginales(data.results);
                    setCargando(false);
                    setPagina(pagina + 1);
                })
            .catch(error => console.log(error));
        }, []);

    function cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                    setPeliculas(peliculas.concat(data.results));
                    setPeliculasOriginales(peliculasOriginales.concat(data.results));
                    setPagina(pagina + 1);
                    setCargando(false);
                })
            .catch(error => console.log(error));
    }

    function controlarCambios(event){
        let valor = event.target.value;
        
        setBusqueda(valor);

        let peliculasFiltradas = peliculasOriginales.filter(function (unaPelicula){
            return valor === "" || unaPelicula.title.toLowerCase().includes(valor.toLowerCase())});

        setPeliculas(peliculasFiltradas);
    }


    function evitarSubmit(event){
        event.preventDefault();
    }

    if(cargando){
        return (
            <div>
                <Header />
                <Loader />
            </div>  
        );
    }
         

        return (
            <div>

                <div className="container">
                <Header />
                    
                    <h2 className="alert alert-primary">Peliculas Mejor Valoradas</h2>
                    <form onSubmit={(event) => evitarSubmit(event)} className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(event) => controlarCambios(event)}
                            value={busqueda}
                            placeholder="Ingrese el nombre de la película"
                        />
                    </form>

                    <section className="row cards">
                        {peliculas.length > 0 ? (
                            peliculas.map((pelicula, idx) => (
                                <Card
                                    key={pelicula.id + idx}
                                    id={pelicula.id}
                                    titulo={pelicula.title}
                                    descripcion={pelicula.overview}
                                    imagen={pelicula.poster_path}
                                    tipo="pelicula"
                                />
                            ))
                        ) : (
                            <p>No se encontraron películas.</p>
                        )}
                    </section>

                        <button onClick={() =>cargarMas()} className="btn btn-success mb-4">
                            Cargar Más
                        </button>

                </div>
            </div>
        );
    }

export default Peliculas;

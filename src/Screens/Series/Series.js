import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card";
import Loader from "../../Components/Loader/Loader";

const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f';

function Series(props) {

    const [series, setSeries] = useState([]);
    const [seriesOriginales, setSeriesOriginales] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                setSeries(data.results);
                setSeriesOriginales(data.results);
                setPagina(pagina + 1);
                setCargando(false);
            })
            .catch(error => console.log(error));
    }, []);

    function cargarMas() {
        fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}&page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                setSeries(series.concat(data.results));
                setSeriesOriginales(seriesOriginales.concat(data.results));
                setPagina(pagina + 1);
                setCargando(false);
            })
            .catch(error => console.log(error));
    }

    function controlarCambios(event) {
        let valor = event.target.value;

        setBusqueda(valor);

        let seriesFiltradas = seriesOriginales.filter(function (unaSerie) {
            return valor === "" || unaSerie.name.toLowerCase().includes(valor.toLowerCase());
        });

        setSeries(seriesFiltradas);
    }

    function evitarSubmit(event) {
        event.preventDefault();
    };

    if (cargando) {
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

                <h2 className="alert alert-primary">Series Mejor Valoradas</h2>
                <form onSubmit={(event) => evitarSubmit(event)} className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        onChange={(event) => controlarCambios(event)}
                        values={busqueda}
                        placeholder="Ingrese el nombre de la serie"
                    />
                </form>

                <section className="row cards">
                    {series.length > 0 ? (
                        series.map((serie, idx) => (
                            <Card
                                key={serie.id + idx}
                                id={serie.id}
                                titulo={serie.name}
                                descripcion={serie.overview}
                                imagen={serie.poster_path}
                                tipo="serie"
                            />
                        ))
                    ) : (
                        <p>No se encontraron series.</p>
                    )}
                </section>

                <button onClick={() =>cargarMas()} className="btn btn-success mb-4">
                    Cargar Más
                </button>

            </div>
        </div>
    );
};

export default Series;

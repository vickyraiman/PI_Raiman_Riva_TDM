import React, {useState, useEffect} from "react";
import Card from '../Card/Card';
import Loader from "../../Components/Loader/Loader";
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f'

function SeccionTVNowPlaying(props) {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => setSeries(data.results))
            .catch(error => console.log(error));
    }, []);


        if (series === null) {
            return (
                <Loader/>
            )
        }
        return(
            <section className="row cards" id="on-air-today">
                {series.slice(0,4).map((serie)=>(
                        <Card
                            key={serie.id}
                            id={serie.id}
                            titulo={serie.name}
                            descripcion={serie.overview}
                            imagen={serie.poster_path}
                            tipo='serie'/>
                    ))}
            </section>
        )
    }


export default SeccionTVNowPlaying;
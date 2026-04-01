import React from 'react';
import {Link} from 'react-router-dom';

function Card(props) {
    return(
        <article className="single-card-movie">
                <img src={"https://image.tmdb.org/t/p/w342/" + props.imagen} className="card-img-top"
                    alt={props.titulo}/>

                <div className="cardBody">
                    <h5 className="card-title">{props.titulo}</h5>
                    <p className="card-text">{props.descripcion}</p>
                    <Link to={`/pelicula/${props.id}`}>
                    <button className="btn btn-primary">Ver Más</button>
                    </Link>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
    )
}

export default Card;
import React from 'react';

function Card(props) {
    return(
        <article className="single-card-movie">
                <img src={props.imagen} className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">{props.titulo}</h5>
                    <p className="card-text">{props.descripcion}</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
    )
}

export default Card;
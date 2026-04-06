import React, {Component} from "react";
import Card from '../Card/Card'
const apikey = 'd83de1bb2a9e924ae59cd4751b6e015f'

class SeccionTVNowPlaying extends Component{
    constructor(props){
        super(props);
        this.state = {
            series: []
        };
    }

    componentDidMount(){

        fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apikey}`)
            .then(response => response.json())
            .then(data => this.setState({series: data.results}))
            .catch(error => console.log(error));

    }

    render(){

        return(
            <section className="row cards" id="on-air-today">
                {this.state.series.map((serie)=>(
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
}

export default SeccionTVNowPlaying;
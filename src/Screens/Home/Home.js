import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Busqueda from "../../Components/Busqueda/Busqueda";
import SeccionPeliPopulares from "../../Components/SeccionPeliPopulares/SeccionPeliPopulares";
import SeccionPeliNowPlaying from "../../Components/SeccionPeliNowPlaying/SeccionPeliNowPlaying";
import SeccionTVPopulares from "../../Components/SeccionTVPopulares/SeccionTVPopulares";
import SeccionTVNowPlaying from "../../Components/SeccionTVNowPlaying/SeccionTVNowPlaying";

function Home() {

    return (
        <div className="container">
            <Header />

            <Busqueda />

            <h2 className="alert alert-primary">Popular Movies This Week</h2>
            <SeccionPeliPopulares />

            <h2 className="alert alert-primary">Movies Now Playing</h2>
            <SeccionPeliNowPlaying />

            <h2 className="alert alert-warning">Popular TV Shows This Week</h2>
            <SeccionTVPopulares />

            <h2 className="alert alert-warning">TV Shows Airing Today</h2>
            <SeccionTVNowPlaying />
            <Footer />
        </div>
    );
}

export default Home;
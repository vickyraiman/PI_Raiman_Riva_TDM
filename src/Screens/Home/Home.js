import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Card from "../../Components/Card/Card";
import SeccionPeliPopulares from "../../Components/SeccionPeliPopulares/SeccionPeliPopulares";

function Home() {

    return (
        <div className = "container">
            <Header />

            <form className="search-form" action="" method="GET">
                <input type="text" name="searchData" placeholder="Buscar..." />
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>

            <h2 className="alert alert-primary">Popular Movies This Week</h2>
            <SeccionPeliPopulares/>

            <h2 className="alert alert-primary" id="now-playing">Movies Now Playing</h2>

            <Footer />
        </div>
    );
}

export default Home;
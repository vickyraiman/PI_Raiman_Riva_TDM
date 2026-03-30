import React, { Component } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

function Home() {
    return (
        <div>
            <Header />

            <form className="search-form" action="" method="GET">
                <input type="text" name="searchData" placeholder="Buscar..." />
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>


            
            <Footer />
        </div>
    );
}

export default Home;
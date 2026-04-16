import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import DetallePelicula from "./Screens/DetallePelicula/DetallePelicula";
import SearchResults from "./Screens/SearchResults/SearchResults";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import DetalleSerie from "./Screens/DetalleSerie/DetalleSerie";
import Error from "./Screens/Error/Error";
import Registro from "./Screens/Registro/Registro";
import Login from "./Screens/Login/Login";
import Peliculas from "./Screens/Peliculas/Peliculas"
import Series from "./Screens/Series/Series"

function App() {
  return (
   <div>

    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/searchresults/:nombre" component={SearchResults} />
      <Route path="/pelicula/:id" component={DetallePelicula} />
      <Route path="/serie/:id" component={DetalleSerie}/>
      <Route path="/Registro" component={Registro}/>
      <Route path="/Login" component={Login}/>
      {/* <Route path="/Peliculas" component={Peliculas}/>
      <Route path="/Series" component={Series}/> */}
      <Route component={Error}/>
    </Switch>
    <Footer/>
    </div> 
  )
}

export default App;

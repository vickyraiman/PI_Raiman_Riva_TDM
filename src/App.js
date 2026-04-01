import React from "react";
import { Switch, Route } from "react-router-dom";

// import CrearCuenta from "./Screens/CrearCuenta/CrearCuenta";
// import Error from "./Screens/Error/Error";
// import Favoritas from "./Screens/Favoritas/Favoritas";
import Home from "./Screens/Home/Home";
// import Login from "./Screens/Login/Login";
// import Peliculas from "./Screens/Peliculas/Peliculas";
// import Series from "./Screens/Series/Series";
// import Pelicula from "./Screens/Pelicula/Pelicula";
// import Serie from "./Screens/Serie/Serie";


function App() {
  return (

    <Switch>
      <Route path="/" exact={true} component={Home} />
      {/* <Route path="/peliculas" component={Peliculas} />
      <Route path="/series" component={Series} />
      <Route path="/favoritas" component={Favoritas} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={CrearCuenta} />
      <Route path="/pelicula/:id" component={Pelicula} />
      <Route path="/serie/:id" component={Serie} />
      <Route component={Error} /> */}
    </Switch>

  )
}

export default App;

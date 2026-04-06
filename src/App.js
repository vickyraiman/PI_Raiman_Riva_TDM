import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import DetallePelicula from "./Screens/DetallePelicula/DetallePelicula";
import SearchResults from "./Screens/searchResults/searchResults";


function App() {
  return (

    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/searchresults/:nombre" element={<SearchResults />} />
      <Route path="/pelicula/:id" element={<DetallePelicula />} />
    </Switch>

  )
}

export default App;

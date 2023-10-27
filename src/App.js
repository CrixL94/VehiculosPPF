import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VerticalMenu from "./components/verticalMenu";
import Vehiculos from "./components/vehiculosTable";
import EntradasSalidas from "./components/entradasSalidas";
import NuevoVehiculo from "./components/nuevoVehiculo"

function App() {
  return (
    <Router>
      <div className="flex">
        <VerticalMenu />
        <div className="ml-4 w-full p-5">
          <Routes>
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/entradas-salidas" element={<EntradasSalidas />} />
            <Route path="/nuevo-vehiculo" element={<NuevoVehiculo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

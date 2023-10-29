import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VerticalMenu from "./components/verticalMenu";
import Vehiculos from "./components/vehiculosTable";
import EntradasSalidas from "./components/entradasSalidas";
import NuevoVehiculo from "./components/nuevoVehiculo"
import NuevaEntradaSalida from "./components/nuevaEntraSalida";


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
            <Route path="/nuevo-vehiculo/:id" element={<NuevoVehiculo />} />
            <Route path="/nueva-entrada-salida" element={<NuevaEntradaSalida />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

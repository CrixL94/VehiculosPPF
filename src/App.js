import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VerticalMenu from "./components/verticalMenu";
import Vehiculos from "./components/vehiculosTable"; // Corrige la importación
import EntradasSalidas from "./components/entradasSalidas";

function App() {
  return (
    <Router>
      <div className="flex">
        <VerticalMenu />
        <div className="ml-4 p-4">
          <Routes>
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/entradas-salidas" element={<EntradasSalidas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

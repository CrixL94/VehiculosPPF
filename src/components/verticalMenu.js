import React from "react";
import { Link } from "react-router-dom";

function VerticalMenu() {
  return (
    <div className="bg-gray-900 text-white w-[20rem] h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 underline">Vehiculos PPF</h1>
      <ul className="space-y-8 mt-10">
        <li>
          <Link to="/vehiculos" className="hover:text-blue-500 uppercase font-semibold">Vehiculos</Link>
        </li>
        <li>
          <Link to="/entradas-salidas" className="hover:text-blue-500 uppercase font-semibold">Entradas/Salidas</Link>
        </li>
      </ul>
    </div>
  );
}

export default VerticalMenu;

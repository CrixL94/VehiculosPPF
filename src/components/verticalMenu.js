import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

function VerticalMenu() {
  return (
    <div className="bg-gray-900 text-white w-[20rem] h-screen p-4">
      <div className="text-2xl font-bold mb-4">
        <span className="text-blue-500">Vehículos</span> PPF
      </div>
      <ul className="space-y-8 mt-20 ">
        <li>
          <Link to="/vehiculos" className="flex items-center hover:text-blue-500 font-semibold">
            <span className="mr-2">
              <FontAwesomeIcon icon={faCar} /> {/* Icono de coche */}
            </span>
            Vehículos
          </Link>
        </li>
        <li>
          <Link to="/entradas-salidas" className="flex items-center hover:text-blue-500 font-semibold">
            <span className="mr-2">
              <FontAwesomeIcon icon={faExchangeAlt} /> {/* Icono de intercambio */}
            </span>
            Entradas/Salidas
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default VerticalMenu;

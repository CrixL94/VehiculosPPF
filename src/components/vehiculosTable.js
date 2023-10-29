import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/get-vehiculos')
      .then((response) => {
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de vehículos:', error);
      });
  }, []);

  return (
    <div className="p-6">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Lista de Vehículos</h1>
        <Link to="/nuevo-vehiculo">
          <button className="text-white bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-indigo-400">
            Crear Nuevo
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md rounded-2xl mt-5 h-[30rem]">
        <table className="w-full text-sm text-left table-auto overflow-auto">
          <thead className="text-xs uppercase bg-indigo-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Placa
              </th>
              <th scope="col">

              </th>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {vehiculos.map((vehiculo, index) => (
              <tr key={index} className="border-t border-2">
                <td className="px-6 py-4">
                  {vehiculo.marca}
                </td>
                <td className="px-6 py-4">
                  {vehiculo.modelo}
                </td>
                <td className="px-6 py-4">
                  {vehiculo.placa}
                </td>
                <td className="py-4">
                  <Link to={`/nuevo-vehiculo/${vehiculo._id}`}>
                    <button className="text-gray-900 font-semibold text-sm">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </Link>
                  <button className="text-red-700 font-semibold text-sm ml-5">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
}


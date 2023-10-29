import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [busquedaMarca, setBusquedaMarca] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9000/api/get-vehiculos')
      .then((response) => {
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de vehículos:', error);
      });
  }, []);

  // Funcion para eliminar un vehiculo
  const eliminarVehiculo = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //realiza la solicitud de eliminacion
        axios.delete(`http://localhost:9000/api/delete-vehiculo/${id}`)
          .then(() => {
            Swal.fire(
              '¡Eliminado!',
              'Tu registro ha sido eliminado.',
              'success'
            );
            // Recarga la lista de vehiculos despues de la eliminacion
            axios.get('http://localhost:9000/api/get-vehiculos')
              .then((response) => {
                setVehiculos(response.data);
              })
              .catch((error) => {
                console.error('Error al obtener la lista de vehículos:', error);
              });
          })
          .catch((error) => {
            console.error('Error al eliminar el vehículo:', error);
          });
      }
    });
  };

  // Funcion para filtrar la busqueda por marca
  const buscarVehiculo = (e) => {
    setBusquedaMarca(e.target.value);
  };

  // Filtrar vehiculos por marca
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.marca.toLowerCase().includes(busquedaMarca.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4">Lista de Vehículos</h1>
        <input
          type="text"
          value={busquedaMarca}
          onChange={buscarVehiculo}
          placeholder="Buscar por marca"
          className="w-[25rem] border p-2 rounded-lg focus:outline-none"
        />
        <Link to="/nuevo-vehiculo">
          <button className="text-white bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-indigo-400">
            Crear Nuevo
          </button>
        </Link>
      </div>

      <div className={`overflow-x-auto shadow-md rounded-2xl mt-5 ${vehiculosFiltrados.length > 8 ? 'h-[30rem]' : 'h-auto'}`}>
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {vehiculosFiltrados.length > 0 ? (
              vehiculosFiltrados.map((vehiculo, index) => (
                <tr key={index} className="border-t border-2">
                  <td className="px-6 py-4">{vehiculo.marca}</td>
                  <td className="px-6 py-4">{vehiculo.modelo}</td>
                  <td className="px-6 py-4">{vehiculo.placa}</td>
                  <td className="py-4">
                    <Link to={`/nuevo-vehiculo/${vehiculo._id}`}>
                      <button className="text-gray-900 font-semibold text-sm">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </Link>
                    <button onClick={() => eliminarVehiculo(vehiculo._id)} className="text-red-700 font-semibold text-sm ml-5">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center items-center justify-center py-4">
                  No existen registros de esa marca.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

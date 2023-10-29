import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { } from '@mui/material/Select';

export default function EntradasSalidas() {
  const [entradasSalidas, setEntradasSalidas] = useState([]);
  const [filtroMotorista, setFiltroMotorista] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    // Llamada a la API para obtener los estados
    axios.get('http://localhost:9000/api/get-estados')
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de estados:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:9000/api/get-entradas')
      .then((response) => {
        setEntradasSalidas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de entradas/salidas:', error);
      });
  }, []);

  // Funcion para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Funcion para filtrar la busqueda por motorista
  const buscarMotorista = (e) => {
    setFiltroMotorista(e.target.value);
  };

  // Filtrar los resultados en funcion del motorista
  const entradasFiltradas = entradasSalidas.filter((entradaSalida) => {
    const motoristaMatch = !filtroMotorista || entradaSalida.motorista.toLowerCase().includes(filtroMotorista.toLowerCase());
    const estadoMatch = !filtroEstado || entradaSalida.estado.nombreEstado === filtroEstado;
    return motoristaMatch && estadoMatch;
  });


  const handleFiltroEstadoChange = (event) => {
    setFiltroEstado(event.target.value);
  };


  return (
    <div className="p-6">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4">Entradas y Salidas de Vehículos</h1>
        <input
          type="text"
          value={filtroMotorista}
          onChange={buscarMotorista}
          placeholder="Buscar por motorista"
          className="w-[25rem] border p-2 rounded-lg focus:outline-none"
        />
        <Link to="/nueva-entrada-salida">
          <button className="text-white bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-indigo-400">
            Crear Nuevo
          </button>
        </Link>
      </div>

      <Box sx={{ minWidth: 120 }}>
        <h2 className='text-gray-400 uppercase'>Filtar por estado</h2>
        <FormControl className='w-[9rem]'>
          <Select
            id="filtro-estado"
            value={filtroEstado}
            onChange={handleFiltroEstadoChange}
          >
            {estados.map((estado) => (
              <MenuItem key={estado.nombreEstado} value={estado.nombreEstado}>
                {estado.nombreEstado}
              </MenuItem>
            ))}
            <MenuItem value="">Limpiar Filtros</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div className={`overflow-x-auto shadow-md rounded-2xl mt-5 ${entradasFiltradas.length > 6 ? 'h-[25.5rem]' : 'h-auto'}`}>
        <table className="w-full text-sm text-left table-auto overflow-auto">
          <thead className="text-xs uppercase bg-indigo-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Motorista
              </th>
              <th scope="col" className="px-6 py-3">
                Vehículo
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                Hora
              </th>
              <th scope="col" className="px-6 py-3">
                Kilometraje
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className='font-medium'>
            {entradasFiltradas.length > 0 ? (
              entradasFiltradas.map((entradaSalida, index) => (
                <tr key={index} className="border-t border-2">
                  <td className="px-6 py-4">{entradaSalida.motorista}</td>
                  <td className="px-6 py-4">{entradaSalida.vehiculo.marca}</td>
                  <td className="px-6 py-4">{formatDate(entradaSalida.fecha)}</td>
                  <td className="px-6 py-4">{entradaSalida.hora}</td>
                  <td className="px-6 py-4">{entradaSalida.kilometraje}</td>
                  <td className={`px-6 py-4 ${entradaSalida.estado.nombreEstado === 'Entrada' ? 'text-green-500' : 'text-red-500'}`}>{entradaSalida.estado.nombreEstado}</td>
                  {/* <td className="py-4">
                    <Link>
                      <button className="text-gray-900 font-semibold text-sm">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </Link>
                    <button className="text-red-700 font-semibold text-sm ml-5">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center items-center justify-center py-4">
                  No existen registros de entradas o salidas con ese nombre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

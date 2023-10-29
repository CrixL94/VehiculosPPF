import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function NuevaEntradaSalida() {
    const [vehiculos, setVehiculos] = useState([]);
    const [estados, setEstados] = useState([]);
    const navigate = useNavigate();
    const [entradaSalida, setEntradaSalida] = useState({
        vehiculo: '', //almacena el ID del vehículo
        motorista: '',
        fecha: '',
        hora: '',
        kilometraje: '',
        estado: '', //almacena el ID del estado
    });

    useEffect(() => {
        axios.get('http://localhost:9000/api/get-vehiculos')
            .then((response) => {
                setVehiculos(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de vehículos:', error);
            });

        axios.get('http://localhost:9000/api/get-estados')
            .then((response) => {
                setEstados(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de estados:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntradaSalida({ ...entradaSalida, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!entradaSalida.vehiculo || !entradaSalida.motorista || !entradaSalida.fecha || !entradaSalida.hora || !entradaSalida.kilometraje || !entradaSalida.estado) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos.',
            });
            return;
        }

        fetch('http://localhost:9000/api/post-entrada-salida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entradaSalida),
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro creado con éxito',
                    showConfirmButton: false,
                    timer: 2000,
                });

                setTimeout(() => {
                    navigate('/entradas-salidas');
                }, 2000); // Redirige a la lista de entradas y salidas
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al guardar el registro.',
                });
            });
    };

    const cancelar = () => {
        navigate('/entradas-salidas');
    }

    return (
        <div className="p-6">
            <div className="p-6 border rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Crear Nueva Entrada/Salida</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -m-2">
                        <div className="w-1/2 p-2">
                            <label className="block text-sm font-medium text-gray-600">Seleccione un vehiculo</label>
                            <Select
                                name="vehiculo"
                                fullWidth
                                value={entradaSalida.vehiculo}
                                onChange={handleInputChange}
                            >
                                {vehiculos.map((vehiculo) => (
                                    <MenuItem key={vehiculo._id} value={vehiculo._id}>
                                        {`${vehiculo.marca} - ${vehiculo.modelo} (${vehiculo.placa})`}
                                    </MenuItem>
                                ))}
                            </Select>

                        </div>
                        <div className="w-1/2 p-2">
                            <label className="block text-sm font-medium text-gray-600">Nombre Motorista</label>
                            <TextField
                                name="motorista"
                                variant="outlined"
                                fullWidth
                                placeholder="Juan Perez"
                                value={entradaSalida.motorista}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2 p-2">
                            <label className="block text-sm font-medium text-gray-600">Fecha</label>
                            <TextField
                                name="fecha"
                                type="date"
                                variant="outlined"
                                fullWidth
                                placeholder="Juan Perez"
                                value={entradaSalida.fecha}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2 p-2">
                            <label className="block text-sm font-medium text-gray-600">Hora</label>
                            <TextField
                                name="hora"
                                variant="outlined"
                                fullWidth
                                placeholder="11:00 AM/PM"
                                value={entradaSalida.hora}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2 p-2">
                            <label className="block text-sm font-medium text-gray-600">Kilometraje</label>
                            <TextField
                                name="kilometraje"
                                variant="outlined"
                                fullWidth
                                placeholder="12500"
                                value={entradaSalida.kilometraje}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2 p-2">
                            <label className="block text-sm font-medium text-gray-600">Seleccione un estado</label>

                            <Select
                                name="estado"
                                value={entradaSalida.estado}
                                onChange={handleInputChange}
                                fullWidth
                            >
                                {estados.map((estado) => (
                                    <MenuItem key={estado._id} value={estado._id}>
                                        {estado.nombreEstado}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <button onClick={cancelar}
                        className="bg-gray-500 mr-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="mt-4 bg-indigo-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    >
                        Crear Registro
                    </button>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function NuevoVehiculo() {
    const navigate = useNavigate();
    const [vehiculo, setVehiculo] = useState({ marca: '', modelo: '', placa: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.placa) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos.'
            });
            return;
        }

        fetch('http://localhost:9000/api/vehiculos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehiculo),
        })
            .then((response) => response.json())
            .then((data) => {
                // Si la solicitud es exitosa, muestra la notificación SweetAlert
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tu registro ha sido guardado',
                    showConfirmButton: false,
                    timer: 2000
                });

                // Redirige a la tabla de vehiculos
                setTimeout(() => {
                    navigate('/vehiculos');
                }, 2000);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos vacíos',
                    text: 'Por favor, complete todos los campos.'
                });
            });
    };

    const cancelar = () => {
        navigate('/vehiculos');
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="p-6 w-1/2 border rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold mb-4">Registrar Nuevo Vehículo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Marca</label>
                        <input
                            type="text"
                            className="border w-full p-2 rounded"
                            value={vehiculo.marca}
                            onChange={(e) => setVehiculo({ ...vehiculo, marca: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Modelo</label>
                        <input
                            type="text"
                            className="border w-full p-2 rounded"
                            value={vehiculo.modelo}
                            onChange={(e) => setVehiculo({ ...vehiculo, modelo: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Placa</label>
                        <input
                            type="text"
                            className="border w-full p-2 rounded"
                            value={vehiculo.placa}
                            onChange={(e) => setVehiculo({ ...vehiculo, placa: e.target.value })}
                        />
                    </div>
                    <button onClick={cancelar}
                        className="bg-gray-500 mr-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                    >
                        Crear Vehículo
                    </button>
                </form>
            </div>
        </div>
    );
}

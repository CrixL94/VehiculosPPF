import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoVehiculo() {
    const navigate = useNavigate();
    const [vehiculo, setVehiculo] = useState({ marca: '', modelo: '', placa: '' });

    const handleSubmit = async (e) => {
        navigate('/vehiculos');
    };

    const cancelar = () => {
        navigate('/vehiculos');
    }

    return (
        <div className="p-6 w-1/2 border-2 border-gray-500 rounded-2xl">
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
    );
}

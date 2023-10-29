import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function NuevoVehiculo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [modoEdicion, setModoEdicion] = useState(false);
    const [vehiculo, setVehiculo] = useState({ marca: '', modelo: '', placa: '' });


    useEffect(() => {
        if (id) {
            // Si se proporciona un ID en los parametros, el componente esta en modo de edicion
            setModoEdicion(true);
            // realiza una solicitud para obtener los detalles del vehiculo por su ID
            fetch(`http://localhost:9000/api/get-vehiculo/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    // Actualiza el estado del vehiculo con los datos obtenidos
                    setVehiculo(data);
                })
                .catch((error) => {
                    console.error('Error al obtener el vehiculo:', error);
                });
        }
    }, [id]);

    const nuevoVehiculo = (e) => {
        e.preventDefault();

        // Validar que los campos no esten vacios
        if (!vehiculo.marca || !vehiculo.modelo || !vehiculo.placa) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, complete todos los campos.'
            });
            return;
        }

        // crear un nuevo vehículo
        fetch('http://localhost:9000/api/vehiculos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehiculo),
        })
            .then((response) => response.json())
            .then((data) => {
                // Si la solicitud es exitosa, muestra la notificacion SweetAlert
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tu registro ha sido guardado',
                    showConfirmButton: false,
                    timer: 2000,
                });

                // Redirige a la tabla de vehículos
                setTimeout(() => {
                    navigate('/vehiculos');
                }, 2000);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al guardar el registro.',
                });
            });
    };

    const editarVehiculo = (e) => {
        e.preventDefault();
        // editar un vehiculo
        fetch(`http://localhost:9000/api/update-vehiculo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehiculo),
        })
            .then((response) => response.json())
            .then((data) => {
                // Si la solicitud es exitosa, muestra la notificacion SweetAlert
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Los cambios han sido guardados',
                    showConfirmButton: false,
                    timer: 2000,
                });

                // Redirige a la tabla de vehiculos
                setTimeout(() => {
                    navigate('/vehiculos');
                }, 2000);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al guardar los cambios.',
                });
            });
    };

    const submit = modoEdicion ? editarVehiculo : nuevoVehiculo;

    const cancelar = () => {
        navigate('/vehiculos');
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="p-6 w-1/2 border rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold mb-4">
                    {modoEdicion ? 'Actualizar Vehículo' : 'Crear Nuevo Vehiculo'}
                </h1>
                <form onSubmit={submit}>
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
                        {modoEdicion ? 'Guardar Cambios' : 'Crear Vehiculo'}
                    </button>
                </form>
            </div>
        </div>
    );
}

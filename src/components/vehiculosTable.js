import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios'; // Importa axios para realizar la solicitud

export default function Vehiculos() {
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        // Realiza una solicitud GET a tu ruta de API para obtener la lista de vehículos
        axios.get('http://localhost:9000/api/get-vehiculos')
            .then((response) => {
                setVehiculos(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de vehículos:', error);
            });
    }, []);

    return (
        <div className="card">
            <DataTable value={vehiculos} tableStyle={{ minWidth: '50rem' }}>
                <Column field="marca" header="Marca"></Column>
                <Column field="modelo" header="Modelo"></Column>
                <Column field="placa" header="Placa"></Column>
            </DataTable>
        </div>
    );
}


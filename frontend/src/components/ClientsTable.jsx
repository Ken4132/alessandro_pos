import { useEffect, useState } from 'react';
import api from '../services/api';

function ClientsTable() {

  const [clients, setClients] = useState([]);

  useEffect(() => {

    getClients();

  }, []);

  const getClients = async () => {

    try {

      const response = await api.get('/clients');

      setClients(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div>

      <h2>Clientes</h2>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
          </tr>
        </thead>

        <tbody>

          {clients.map((client) => (

            <tr key={client.id}>

              <td>{client.id}</td>

              <td>{client.nombres}</td>

              <td>{client.apellidos}</td>

              <td>{client.telefono}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ClientsTable;
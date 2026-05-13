import { useEffect, useState } from 'react';
import api from '../services/api';

function DashboardStats() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    getStats();

  }, []);

  const getStats = async () => {

    try {

      const response = await api.get(
        '/credits/stats/dashboard'
      );

      setStats(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div
      style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '40px'
      }}
    >

      <div border="1">

        <h3>Clientes</h3>

        <p>{stats.clientes}</p>

      </div>

      <div>

        <h3>Créditos</h3>

        <p>{stats.creditos}</p>

      </div>

      <div>

        <h3>Morosos</h3>

        <p>{stats.morosos}</p>

      </div>

      <div>

        <h3>Saldo pendiente</h3>

        <p>Q{stats.saldoPendiente}</p>

      </div>

    </div>
  );
}

export default DashboardStats;
import { useEffect, useState } from 'react';
import api from '../services/api';

function LateCreditsTable() {

  const [credits, setCredits] = useState([]);

  useEffect(() => {

    getLateCredits();

  }, []);

  const getLateCredits = async () => {

    try {

      const response = await api.get(
        '/credits/late'
      );

      setCredits(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div style={{ marginTop: '40px' }}>

      <h2>Créditos en Mora </h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>

            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Saldo</th>
            <th>Días atraso</th>

          </tr>

        </thead>

        <tbody>

          {credits.map((credit) => (

            <tr key={credit.id}>

              <td>
                {credit.nombres} {credit.apellidos}
              </td>

              <td>{credit.telefono}</td>

              <td>
                Q{credit.saldo_pendiente}
              </td>

              <td>
                {credit.dias_atraso}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LateCreditsTable;
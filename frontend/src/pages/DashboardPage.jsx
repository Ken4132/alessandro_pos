import DashboardStats from '../components/DashboardStats';
import ClientsTable from '../components/ClientsTable';
import LateCreditsTable from '../components/LateCreditsTable';

function DashboardPage() {

  return (

    <div style={{ padding: '20px' }}>

      <h1>Dashboard TRIVIUM POS </h1>

      <p>Sistema funcionando correctamente</p>

      <DashboardStats />

      <ClientsTable />

      <LateCreditsTable />

    </div>
  );
}

export default DashboardPage;
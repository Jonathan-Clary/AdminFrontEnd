import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/login/Login';
import { NavBar } from './components/nav-bar/NavBar';
import { AdminDashboard } from './components/admin-dashboard/AdminDashboard';
import { SupportTickets } from './components/support-tickets/SupportTickets';
import { ManageUsers } from './components/admin-dashboard/manage-user/ManageUsers';
import { Analytics } from './components/admin-dashboard/analytics/Analytics';

function App() {
  const { token } = useAuth();

  return (
    <div className="App">
      {token != null ? <>{<NavBar/>}</> : <></>}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/users" element={token ? <ManageUsers /> : <Navigate to="/login" />} />
        <Route path="/support-tickets" element={token ? <SupportTickets /> : <Navigate to="/login" />} />
        <Route path="/analytics" element={token ? <Analytics /> : <Navigate to="/login" />} />
      </Routes>

    </div >
  );
}

export default App;

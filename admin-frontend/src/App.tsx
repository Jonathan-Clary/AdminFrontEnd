import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/login/Login';
import { NavBar } from './components/nav-bar/NavBar';
import { AdminDashboard } from './components/admin-dashboard/AdminDashboard';
import { SupportTickets } from './components/support-ticket-dashboard/SupportTickets';
import { ManageUsers } from './components/manage-user-dashboard/ManageUsers';
import { Analytics } from './components/analytics/Analytics';
import { CustomToast } from './components/toast/CustomToast';
import { useGlobalContext } from './contexts/GlobalContext';

function App() {
  const { token } = useAuth();
  const {toastBg} = useGlobalContext();

  return (
    <div className="App">
      {/* Add check to hide navBar if @ login page */}
      {token != null ? <>{<NavBar/>}</> : <></>}
      <CustomToast bg={toastBg} />
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

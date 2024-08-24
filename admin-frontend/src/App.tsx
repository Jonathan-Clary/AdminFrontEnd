import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/login/Login';
import { SupportTickets } from './components/support-tickets/SupportTickets';
import { NavBar } from './components/nav-bar/NavBar';

function App() {
  const { token } = useAuth();

  return (
    <div className="App">
      {token != null ? <>{<NavBar/>}</> : <></>}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token ? <SupportTickets /> : <Navigate to="/login" />} />
      </Routes>

    </div >
  );
}

export default App;

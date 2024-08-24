import { Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext";


export const NavBar: React.FC = () => {

    const { logout } = useAuth();
    const handelLogout = () => {
        logout();
    }

    return (
        <Navbar className="navbar bg-dark border-bottom border-body" data-bs-theme="dark"  sticky='top'>
  
        <Navbar.Brand className='fw-bold fs-3 ms-5' as={Link} to="/dashboard">
          ADMIN TRAVEL
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end me-5">
          <div className='me-5'>
          <Navbar.Text style={{ color: 'white' }}>
           TEMP
          </Navbar.Text>
          </div>
          <Nav.Link onClick={() => handelLogout()}>
            <i className="bi bi-box-arrow-right" style={{ fontSize: '25px', color: 'white' }}></i>
          </Nav.Link>
        </Navbar.Collapse>
      
    </Navbar>
    )
}
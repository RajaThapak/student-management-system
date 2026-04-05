import { Link, NavLink, useNavigate } from "react-router-dom";
import { authStorage } from "../auth/storage";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStorage.clear();
    navigate("/login");
  };

  return (
    <header className="app-navbar">
      <Link to="/dashboard" className="brand">
        ScholarTrack
      </Link>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/students/new">Add Student</NavLink>
      </nav>
      <button type="button" className="btn btn-outline" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Navbar;

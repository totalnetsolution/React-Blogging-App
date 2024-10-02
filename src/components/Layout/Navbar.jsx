import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info">
      <div className="container">
        <Link to="/" className="navbar-brand">Blog Platform</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <>
                <li className="nav-item"> <br />
                  <span className="navbar-text">Welcome, {currentUser.displayName}</span> <br /> <br />
                </li>
                <li className="nav-item">
                  <Link to="/create-post" className="nav-link">Create Post</Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

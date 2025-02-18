import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../config/auth";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Tienda online
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {!user && (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Registro
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex align-items-center">
              {user ? (
                <>
                  <span className="text-white me-3">
                    {user.displayName || user.email}
                  </span>
                  <button className="btn btn-danger" onClick={logout}>
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link to="/cart" className="text-white me-3">
                  <FaShoppingCart size={24} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main style={{ flex: 1, minHeight: "100vh" }}>{children}</main>

      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              Ecommerce © 2025 Todos los derechos reservados.
            </p>
            <div>
              <a href="#" className="text-white me-3">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white me-3">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { Layout };

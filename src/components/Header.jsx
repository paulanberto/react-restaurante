import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "./Button";
import fioriLogo from "../assets/images/fiori-logo.png";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar navbar-expand-lg bd-navbar sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={fioriLogo} alt="Fiori di Sicilia" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item">
                  <Button
                    onClick={logout}
                    className="btn btn-danger"
                    text="Logout"
                    type="button"
                  />
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

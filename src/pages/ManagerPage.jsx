import React from "react";
import { Link } from "react-router-dom";
import "./CustomerPage.css";
import fioriLogo from "../assets/images/fiori-logo.png";

export default function ManagerPage() {
  return (
    <>
      <div className="home-page-container">
        <div className="container py-3 main-content">
          <div className="box text-center">
            <img src={fioriLogo} alt="Fiori di Sicilia" className="main-logo" />

            <h1>Bem vindo, Administrador!</h1>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm text-center hover-card"
                style={{
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="card-body p-3 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">Todos os Menus</h5>
                  </div>
                  <Link to="/menus" className="btn w-100 mt-auto btn-customer">
                    VER MENUS
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm text-center hover-card"
                style={{
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="card-body p-3 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">Criar novo menu</h5>
                  </div>
                  <Link
                    to="/create-menu"
                    className="btn w-100 mt-auto btn-customer"
                  >
                    CRIAR MENU
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./CustomerPage.css";
import fioriLogo from "../assets/images/fiori-logo.png";

export default function CustomerPage() {
  return (
    <>
      <div className="home-page-container">
        <div className="container py-3 main-content">
          <div className="box text-center">
            <img src={fioriLogo} alt="Fiori di Sicilia" className="main-logo" />

            <h1 className="text-olive">Olá, bem-vindo ao Fiori di Sicilia</h1>
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
                    <h5 className="card-title">
                      Ainda não sabe o que vai comer?
                    </h5>
                    <p className="card-text text-muted">Acesse ao nosso menu</p>
                  </div>
                  <Link to="/menus" className="btn w-100 mt-auto btn-customer">
                    MENU
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
                    <h5 className="card-title">Já escolheu?</h5>
                    <p className="card-text text-muted">
                      Faça agora o seu pedido
                    </p>
                  </div>
                  <Link to="/order" className="btn w-100 mt-auto btn-customer">
                    FAZER PEDIDO
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

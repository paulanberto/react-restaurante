import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import fioriLogo from "../assets/images/fiori-logo.png";

export default function HomePage() {
  return (
    <>
      <div className="home-page-container">
        <div className="container py-3 main-content">
          <div className="box text-center">
            <img src={fioriLogo} alt="Fiori di Sicilia" className="main-logo" />

            <h1 className="text-olive">Bem-vindo ao nosso sistema</h1>

            <p
              className="lead text-center mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Este é o sistema completo de gerenciamento de pedidos do
              restaurante Fiori di Sicilia. Nossa plataforma permite que você:
            </p>

            <ul className="list-group list-group-flush mt-2 mb-3">
              <li className="list-group-item bg-transparent">
                Visualize o cardápio completo
              </li>
              <li className="list-group-item bg-transparent">
                Faça pedidos de forma rápida e prática
              </li>
              <li className="list-group-item bg-transparent">
                Acompanhe o status dos seus pedidos
              </li>
            </ul>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm text-center hover-card">
                <div className="card-body p-3">
                  <h5 className="card-title">Já possui uma conta?</h5>
                  <p className="card-text text-muted">
                    Faça login para acessar o sistema
                  </p>
                  <Link to="/login" className="btn btn-primary w-100">
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm text-center hover-card">
                <div className="card-body p-3">
                  <h5 className="card-title">Novo por aqui?</h5>
                  <p className="card-text text-muted">
                    Crie uma conta para começar
                  </p>
                  <Link to="/signup" className="btn btn-success w-100">
                    Registrar
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

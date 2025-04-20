import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./MenusPage.css";
import fioriLogo from "../assets/images/fiori-logo.png";

export default function MenusPage() {
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch("http://localhost:3000/menus");
    const data = await response.json();
    setMenus(data.menus);
  };

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-white-card">
          <div className="menu-header">
            <img src={fioriLogo} alt="Fiori di Sicilia" className="main-logo" />

            <div className="menu-title-section">
              <h1 className="restaurant-name">CARDÁPIO</h1>
            </div>
          </div>

          <div className="menu-description">
            <p>
              Ingredientes selecionados e métodos tradicionais de produção, cada
              prato é cuidadosamente elaborado para garantir o verdadeiro sabor
              da tradição.
            </p>
          </div>

          {!menus ? (
            <div className="loading-menus">Carregando menus...</div>
          ) : (
            <div className="menus-container">
              {menus.map((menu, index) => (
                <div key={menu.id} className="menu-section">
                  <h2 className="menu-section-title">MENU {index + 1}</h2>
                  <div className="menu-divider"></div>

                  <div className="menu-items">
                    <div className="menu-item">
                      <span className="item-name">Entrada: {menu.starter}</span>
                    </div>

                    <div className="menu-item">
                      <span className="item-name">Principal: {menu.main}</span>
                    </div>

                    <div className="menu-item">
                      <span className="item-name">
                        Sobremesa: {menu.dessert}
                      </span>
                    </div>
                    <div className="menu-item">
                      <span className="item-name-price">
                        Valor: {menu.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

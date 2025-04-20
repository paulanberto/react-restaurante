import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import "./OrderPage.css";
import fioriLogo from "../assets/images/fiori-logo.png";

export default function OrderPage() {
  const { user } = useContext(AuthContext);
  const [menus, setMenus] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await fetch("http://localhost:3000/menus", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setMenus(data.menus);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const order = {
      customer: user.firstName + " " + user.lastName,
      menu: data.menu,
    };

    if (!order.customer || !order.menu) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      setError("Erro ao criar o pedido.");
      return;
    }

    const result = await response.json();

    if (result) {
      setError(null);
      setSuccess("Pedido criado com sucesso!");
      setSelectedMenu("");
    } else {
      setError("Erro ao criar o menu.");
    }
  }

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-white-card order-card">
          <div className="menu-header">
            <img src={fioriLogo} alt="Fiori di Sicilia" className="main-logo" />
            <div className="menu-title-section">
              <h1 className="restaurant-name">FAZER PEDIDO</h1>
            </div>
          </div>

          <div className="menu-description">
            <p>
              Escolha um de nossos menus cuidadosamente elaborados e faça seu
              pedido. Cada menu inclui entrada, prato principal e sobremesa.
            </p>
          </div>

          {error && (
            <div className="message-container error-message">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="message-container success-message">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-section">
              <h2 className="form-section-title">SELEÇÃO DE MENU</h2>
              <div className="menu-divider"></div>

              <div className="form-control">
                <label htmlFor="menu">Escolha seu menu completo:</label>
                <select
                  name="menu"
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  id="menu"
                  required
                  value={selectedMenu}
                  className="menu-select"
                >
                  <option value="">Selecione um Menu</option>
                  {menus &&
                    menus.map((menu) => (
                      <option key={menu.id} value={menu.name || menu.id}>
                        Menu {menu.id}: {menu.starter} - {menu.main} -{" "}
                        {menu.dessert} - {menu.price}€
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {selectedMenu && (
              <div className="selected-menu-preview">
                <h3>Detalhes do Menu Selecionado</h3>
                {menus &&
                  menus
                    .filter(
                      (menu) =>
                        (menu.name || menu.id.toString()) === selectedMenu
                    )
                    .map((menu) => (
                      <div key={menu.id} className="menu-preview-items">
                        <div className="menu-item">
                          <span className="item-name">
                            Entrada: {menu.starter}
                          </span>
                        </div>
                        <div className="menu-item">
                          <span className="item-name">
                            Principal: {menu.main}
                          </span>
                        </div>
                        <div className="menu-item">
                          <span className="item-name">
                            Sobremesa: {menu.dessert}
                          </span>
                        </div>
                        <div className="menu-item">
                          <span className="item-name">
                            Valor: {menu.price}€
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            )}

            <div className="order-actions">
              <button type="submit" className="order-button">
                CONFIRMAR PEDIDO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

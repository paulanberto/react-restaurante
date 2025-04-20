import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import fioriLogo from "../assets/images/fiori-logo.png";

export default function CreateMenuPage() {
  const navigate = useNavigate();
  const [starter, setStarter] = useState("");
  const [main, setMain] = useState("");
  const [dessert, setDessert] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.starter || !data.main || !data.dessert || !data.price) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const response = await fetch("http://localhost:3000/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Erro ao criar o menu.");
      return;
    }

    const result = await response.json();

    if (result) {
      setError(null);
      navigate("/manager");
    } else {
      setError("Erro ao criar o menu.");
    }
  }

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-white-card">
          <div className="menu-header">
            <div className="menu-logo">
              <img
                src={fioriLogo}
                alt="Fiori di Sicilia"
                className="main-logo"
              />
            </div>
          </div>

          <div className="menu-description">
            <p>
              Crie um novo menu completo, com entrada, prato principal e
              sobremesa. Todos os pratos são cuidadosamente elaborados para
              garantir o verdadeiro sabor da tradição.
            </p>
          </div>

          {error && (
            <div className="message-container error-message">
              <p>{error}</p>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="create-menu-form">
            <div className="form-section">
              <h2 className="form-section-title">INFORMAÇÕES DO MENU</h2>
              <div className="menu-divider"></div>

              <div className="form-grid">
                <div className="form-control">
                  <label htmlFor="starter">Entrada</label>
                  <input
                    name="starter"
                    onChange={(event) => setStarter(event.target.value)}
                    value={starter}
                    required
                    id="starter"
                    type="text"
                    placeholder="Ex: Bruschetta di Limoncello"
                    className="styled-input"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="main">Prato Principal</label>
                  <input
                    name="main"
                    onChange={(event) => setMain(event.target.value)}
                    value={main}
                    required
                    id="main"
                    type="text"
                    placeholder="Ex: Ossobuco alla Milanese"
                    className="styled-input"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="dessert">Sobremesa</label>
                  <input
                    name="dessert"
                    onChange={(event) => setDessert(event.target.value)}
                    value={dessert}
                    required
                    id="dessert"
                    type="text"
                    placeholder="Ex: Tiramisu"
                    className="styled-input"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="price">Valor</label>
                  <input
                    name="price"
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                    required
                    id="price"
                    type="text"
                    placeholder="Ex: 45"
                    className="styled-input"
                  />
                </div>
              </div>
            </div>

            <div className="menu-preview">
              <h3>Visualização do Menu</h3>
              <div className="menu-preview-content">
                <div className="menu-item">
                  <span className="item-name">Entrada: {starter || "..."}</span>
                </div>
                <div className="menu-item">
                  <span className="item-name">Principal: {main || "..."}</span>
                </div>
                <div className="menu-item">
                  <span className="item-name">
                    Sobremesa: {dessert || "..."}
                  </span>
                </div>
                {price && (
                  <div className="menu-item">
                    <span className="item-price">Valor: € {price}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <Button className="btn btn-olive w-100" text="CRIAR MENU" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

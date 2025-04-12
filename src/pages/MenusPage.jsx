import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function CreateMenuPage() {
  const navigate = useNavigate();
  const [starter, setStarter] = useState("");
  const [main, setMain] = useState("");
  const [dessert, setDessert] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const menu = {
      starter: data.starter,
      main: data.main,
      dessert: data.dessert,
    };

    if (!menu.starter || !menu.main || !menu.dessert) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const response = await fetch("http://localhost:3000/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    });

    if (!response.ok) {
      console.error("Erro ao criar o menu.");
      return;
    }

    const result = await response.json();

    if (result) {
      setError(null);
      navigate("/menus");
    } else {
      setError("Erro ao criar o menu.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Menu</h2>

      {error && <p className="error">{error}</p>}

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="starter">Entradas</label>
          <input
            name="starter"
            onChange={(event) => setStarter(event.target.value)}
            value={starter}
            isRequired
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="main">Prato Principal</label>
          <input
            name="main"
            onChange={(event) => setMain(event.target.value)}
            value={main}
            isRequired
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="dessert">Sobremesas</label>
          <input
            name="dessert"
            onChange={(event) => setDessert(event.target.value)}
            value={dessert}
            isRequired
          />
        </div>
      </div>

      <p className="form-actions">
        <Button text="Salvar" />
      </p>
    </form>
  );
}

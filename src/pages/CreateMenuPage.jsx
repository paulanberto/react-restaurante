import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function CreateMenuPage() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const menu = {
      starter: data.starter,
      main: data.main,
      dessert: data.dessert,
    };

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
    console.log("Menu criado com sucesso:", result);

    if (result.success) {
      navigate("/");
    } else {
      alert("Falha ao criar o menu");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Menu</h2>
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="starter">Entradas</label>
          <input name="starter" />
        </div>

        <div className="control no-margin">
          <label htmlFor="main">Prato Principal</label>
          <input name="main" />
        </div>

        <div className="control no-margin">
          <label htmlFor="dessert">Sobremesas</label>
          <input name="dessert" />
        </div>
      </div>

      <p className="form-actions">
        <Button text="Salvar" />
      </p>
    </form>
  );
}

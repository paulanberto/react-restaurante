import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";

export default function CreateMenuPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Você não está logado.</div>;
  }

  if (user.role !== "manager") {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const menu = {
      starter: data.starter,
      main: data.main,
      desert: data.desert,
    };

    console.log("menu", menu);

    // const success = await createMenu(menu);

    // if (success) {
    //   navigate("/");
    // } else {
    //   alert("Falha ao criar o menu");
    // }
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
          <label htmlFor="desert">Sobremesas</label>
          <input name="desert" />
        </div>
      </div>

      <p className="form-actions">
        <Button text="Salvar" />
      </p>
    </form>
  );
}

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function KitchenPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Você não está logado.</div>;
  }

  if (user.role !== "chef") {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return <div>Cozinha atualizar listagem de pedidos</div>;
}

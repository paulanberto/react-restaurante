import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function OrderPage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Você não está logado.</div>;
  }

  if (user.role !== "manager") {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return <div>Consumidor fazer pedido</div>;
}

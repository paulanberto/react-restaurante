import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function KitchenPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await fetch("http://localhost:3000/orders");
    const data = await response.json();
    setOrders(data.orders);
  };

  if (!user) {
    return <div>Você não está logado.</div>;
  }

  if (user.role !== "chef") {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return (
    <div>
      <h2>Todos os Pedidos</h2>

      {!orders ? (
        "Nenhum pedido encontrado."
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome do Cliente</th>
              <th>Entradas</th>
              <th>Prato Principal</th>
              <th>Sobremesas</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.customer}</td>
                <td>{order.starters}</td>
                <td>{order.main}</td>
                <td>{order.desserts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function KitchenPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await fetch("http://localhost:3000/orders");
    const data = await response.json();
    setOrders(data.orders);
  };

  const markAsDelivered = async (id) => {
    const response = await fetch(`http://localhost:3000/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Entregue" }),
    });

    if (response.ok) {
      await getOrders();
    } else {
      console.error("Erro ao atualizar o pedido.");
    }
  };

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
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.customer}</td>
                <td>{order.starters}</td>
                <td>{order.main}</td>
                <td>{order.desserts}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Entregue" ? (
                    <span>Pronto</span>
                  ) : (
                    <span>Em Preparação</span>
                  )}
                  <button onClick={() => markAsDelivered(order.id)}>
                    Marcar como Pronto
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

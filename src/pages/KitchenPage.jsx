import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import fioriLogo from "../assets/images/fiori-logo.png";
import "./KitchenPage.css";

export default function KitchenPage() {
  const [orders, setOrders] = useState(null);
  const [statusMessage, setStatusMessage] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders");
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
      setStatusMessage({
        message: "Erro ao carregar pedidos. Tente novamente.",
        type: "error",
      });
    }
  };

  const markAsDelivered = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Entregue" }),
      });

      if (response.ok) {
        setStatusMessage({
          message: "Pedido atualizado com sucesso!",
          type: "success",
        });
        await getOrders();

        setTimeout(() => {
          setStatusMessage({ message: null, type: null });
        }, 3000);
      } else {
        setStatusMessage({
          message: "Erro ao atualizar o pedido. Tente novamente.",
          type: "error",
        });
        console.error("Erro ao atualizar o pedido.");
      }
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      setStatusMessage({
        message: "Erro ao atualizar o pedido. Tente novamente.",
        type: "error",
      });
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pendente":
        return "status-pending";
      case "Em preparo":
        return "status-cooking";
      case "Entregue":
        return "status-delivered";
      default:
        return "";
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-banner">
        <div className="menu-white-card">
          <div className="menu-header">
            <img src={fioriLogo} alt="Fiori di Sicilia" className="main-logo" />

            <div className="menu-title-section">
              <h1 className="restaurant-name">COZINHA</h1>
            </div>
          </div>

          <div className="menu-description">
            <p>
              Gerencie todos os pedidos da cozinha. Atualize o status dos
              pedidos à medida que são preparados e entregues aos clientes.
            </p>
          </div>

          {statusMessage.message && (
            <div className={`status-message ${statusMessage.type}-message`}>
              {statusMessage.message}
            </div>
          )}

          <div className="orders-container">
            <h2 className="form-section-title">LISTA DE PEDIDOS</h2>
            <div className="menu-divider"></div>

            {!orders || orders.length === 0 ? (
              <div className="no-orders-message">
                Nenhum pedido encontrado. Aguarde novos pedidos dos clientes.
              </div>
            ) : (
              <div className="orders-table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Menu</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="order-id">{order.id}</td>
                        <td className="order-customer">{order.customer}</td>
                        <td className="order-menu">{order.menu}</td>
                        <td className="order-status">
                          <span
                            className={`status-badge ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="order-actions">
                          {order.status !== "Entregue" && (
                            <button
                              onClick={() => markAsDelivered(order.id)}
                              className="deliver-button"
                            >
                              Marcar como Entregue
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

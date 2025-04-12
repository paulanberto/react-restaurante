import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "./Button";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h1>Restaurante Manager</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {user && user.role === "manager" && (
            <li>
              <a href="/create-menu">Create Menu</a>
            </li>
          )}
          {user && user.role === "customer" && (
            <li>
              <a href="/order">Fazer Pedido</a>
            </li>
          )}
          {user && user.role === "chef" && (
            <li>
              <a href="/kitchen">Todos os Pedidos</a>
            </li>
          )}
          {user ? (
            <li>
              <Button onClick={logout} text="Logout" type="button" />
            </li>
          ) : (
            <>
              <li>
                <a href="/signup">Registo</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

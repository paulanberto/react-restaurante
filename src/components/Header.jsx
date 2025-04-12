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
          {user ? (
            <>
              <li>
                <a href="/profile">Perfil</a>
              </li>
              <li>
                <Button onClick={logout} text="Logout" type="button" />
              </li>
            </>
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

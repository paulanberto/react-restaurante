import "./auth.css";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const credentials = {
      email: data.email,
      password: data.password,
    };

    try {
      const success = await login(credentials);

      if (success) {
        console.log("Login bem-sucedido");

        const userEmail = credentials.email;

        try {
          const response = await fetch("/backend/data/users.json");
          const users = await response.json();

          const currentUser = users.find((user) => user.email === userEmail);

          if (currentUser) {
            console.log("Usuário encontrado:", currentUser);

            if (currentUser.role === "customer") {
              console.log("Redirecionando para /customer");
              navigate("/customer");
            } else if (currentUser.role === "chef") {
              console.log("Redirecionando para /kitchen");
              navigate("/kitchen");
            } else if (currentUser.role === "manager") {
              console.log("Redirecionando para /manager");
              navigate("/manager");
            } else {
              console.log(
                "Redirecionando para / (role: " + currentUser.role + ")"
              );
              navigate("/");
            }
          } else {
            console.log("Usuário não encontrado no arquivo JSON");
            navigate("/");
          }
        } catch (err) {
          console.error("Erro ao buscar informações do usuário:", err);
          navigate("/");
        }
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Ocorreu um erro durante o login");
    }
  }

  return (
    <>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <form onSubmit={handleSubmit} className="login-form">
              <h1 className="text-center text-olive mb-4 title">Login</h1>

              <div className="card login-card">
                <div className="card-body p-4">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      name="email"
                      id="email"
                      className="form-control"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="form-control"
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <Button className="btn btn-olive w-100" text="Login" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

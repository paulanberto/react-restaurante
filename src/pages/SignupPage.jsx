import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Button from "../components/Button";

export default function SignupPage() {
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);
  const Navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (data.password != data.confirmPassword) {
      setPasswordNotEqual(true);
      return;
    } else {
      setPasswordNotEqual(false);
    }

    const user = {
      email: data.email,
      password: data.password,
      firstName: data["first-name"],
      lastName: data["last-name"],
      role: data.role,
      termsAccepted: data.terms === "on",
    };

    await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    Navigate("/login", { state: { message: "User inserido com sucesso" } });
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1
              className="text-center mb-4"
              style={{ color: "#6b6b48", marginTop: "100px" }}
            >
              Registo
            </h1>

            <div
              className="card"
              style={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control"
                      required
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
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      required
                    />
                    {passwordNotEqual && (
                      <p className="text-danger mt-1 small">
                        As passwords não coincidem
                      </p>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="first-name" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className="form-control"
                        name="first-name"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="last-name" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        className="form-control"
                        name="last-name"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      What best describes your role?
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="form-select"
                      required
                    >
                      <option value="chef">Chef</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>

                  <div className="d-grid">
                    <Button text="Registar" className="btn btn-olive w-100" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

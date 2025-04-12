import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function OnlyCustomer({ element }) {
  const { user } = useContext(AuthContext);

  if (user && user.role !== "customer") {
    return <Navigate to="/login" replace />;
  }

  return element;
}

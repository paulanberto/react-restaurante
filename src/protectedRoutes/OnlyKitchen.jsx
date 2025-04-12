import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function OnlyKitchen({ element }) {
  const { user } = useContext(AuthContext);

  if (!user || (user && user.role !== "chef")) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

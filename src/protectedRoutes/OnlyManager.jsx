import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function OnlyManager({ element }) {
  const { user } = useContext(AuthContext);

  console.log("OnlyManager user", user);

  if (user && user.role !== "manager") {
    return <Navigate to="/login" replace />;
  }

  return element;
}

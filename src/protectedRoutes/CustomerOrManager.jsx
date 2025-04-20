import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function CustomerOrManager({ element }) {
  const { user } = useContext(AuthContext);

  if (
    !user ||
    (user.role.toLowerCase() !== "customer" &&
      user.role.toLowerCase() !== "manager")
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
}

export default CustomerOrManager;

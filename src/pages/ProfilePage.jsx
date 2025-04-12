import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  console.log("user", user);

  return <div>name</div>;
}

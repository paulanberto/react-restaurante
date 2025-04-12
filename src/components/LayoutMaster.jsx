import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutMaster() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer author="Paula Berto" year={2025} />
    </>
  );
}

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {children}
    </div>
  );
}

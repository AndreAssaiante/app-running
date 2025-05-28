import React from "react";
import { Link, useLocation } from "react-router-dom";

const routes = [
  { to: "/", label: "Dashboard" },
  { to: "/profile", label: "Perfil" },
  { to: "/workouts", label: "Treinos" }
];

const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="flex gap-4 p-4 bg-gray-200 border-b mb-6">
      {routes.map((route) => (
        <Link
          key={route.to}
          to={route.to}
          className={
            location.pathname === route.to
              ? "font-bold text-blue-600"
              : "text-gray-700"
          }
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;

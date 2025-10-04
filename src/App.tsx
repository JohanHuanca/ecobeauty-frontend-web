import { Routes, Route, Navigate } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import { LoginPage } from "./features/security/pages/LoginPage";
import { RegisterPage } from "./features/security/pages/RegisterPage";
import { ProfilePage } from "./features/security/pages/ProfilePage";
import { AuthCallbackPage } from "./features/security/pages/AuthCallbackPage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";

export default function App() {
  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <DarkThemeToggle />
      </div>

      <Routes>
        {/* Ruta principal redirige al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

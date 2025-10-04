import { Routes, Route, Navigate } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import { LoginPage } from "./features/security/pages/LoginPage";
import { RegisterPage } from "./features/security/pages/RegisterPage";
import { ProfilePage } from "./features/security/pages/ProfilePage";
import { AuthCallbackPage } from "./features/security/pages/AuthCallbackPage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { ExpertRoute } from "./shared/components/ExpertRoute";
import { TutorialsListPage } from "./features/tutorials/pages/TutorialsListPage";
import { TutorialDetailPage } from "./features/tutorials/pages/TutorialDetailPage";
import { CreateTutorialPage } from "./features/tutorials/pages/CreateTutorialPage";

export default function App() {
  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <DarkThemeToggle />
      </div>

      <Routes>
        {/* Ruta principal redirige a tutoriales */}
        <Route path="/" element={<Navigate to="/tutorials" replace />} />

        {/* Rutas públicas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Rutas de tutoriales */}
        <Route path="/tutorials" element={<TutorialsListPage />} />
        <Route path="/tutorials/:id" element={<TutorialDetailPage />} />
        <Route
          path="/tutorials/create"
          element={
            <ExpertRoute>
              <CreateTutorialPage />
            </ExpertRoute>
          }
        />

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
        <Route path="*" element={<Navigate to="/tutorials" replace />} />
      </Routes>
    </>
  );
}

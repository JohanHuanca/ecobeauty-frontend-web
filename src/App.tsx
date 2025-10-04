import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { CommunityFeedPage } from "./features/community/pages/CommunityFeedPage";
import { PostDetailPage } from "./features/community/pages/PostDetailPage";
import { CreatePostPage } from "./features/community/pages/CreatePostPage";
import { Header } from "./shared/components/Header";

export default function App() {
  const location = useLocation();

  // Páginas que no deben mostrar el Header
  const hideHeaderPaths = ["/login", "/register", "/auth/callback"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <DarkThemeToggle />
      </div>

      {shouldShowHeader && <Header />}

      <Routes>
        {/* Ruta principal redirige a comunidad */}
        <Route path="/" element={<Navigate to="/community" replace />} />

        {/* Rutas públicas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Rutas de comunidad */}
        <Route path="/community" element={<CommunityFeedPage />} />
        <Route path="/community/:id" element={<PostDetailPage />} />
        <Route
          path="/community/create"
          element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />

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
        <Route path="*" element={<Navigate to="/community" replace />} />
      </Routes>
    </>
  );
}

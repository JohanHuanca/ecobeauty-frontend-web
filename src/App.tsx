import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LoginPage } from "./features/security/pages/LoginPage";
import { RegisterPage } from "./features/security/pages/RegisterPage";
import { ProfilePage } from "./features/security/pages/ProfilePage";
import { AuthCallbackPage } from "./features/security/pages/AuthCallbackPage";
import { ProtectedRoute } from "./shared/components/ProtectedRoute";
import { ExpertRoute } from "./shared/components/ExpertRoute";
import { TutorialsListPage } from "./features/tutorials/pages/TutorialsListPage";
import { TutorialDetailPage } from "./features/tutorials/pages/TutorialDetailPage";
import { CreateTutorialPage } from "./features/tutorials/pages/CreateTutorialPage";
import { MyCreatedTutorialsPage } from "./features/tutorials/pages/MyCreatedTutorialsPage";
import { CommunityFeedPage } from "./features/community/pages/CommunityFeedPage";
import { PostDetailPage } from "./features/community/pages/PostDetailPage";
import { CreatePostPage } from "./features/community/pages/CreatePostPage";
import { CourseCatalogPage } from "./features/courses/pages/CourseCatalogPage";
import { CourseDetailPage } from "./features/courses/pages/CourseDetailPage";
import { MyCoursesPage } from "./features/courses/pages/MyCoursesPage";
import { CreateCoursePage } from "./features/courses/pages/CreateCoursePage";
import { ManageCoursePage } from "./features/courses/pages/ManageCoursePage";
import { MyCreatedCoursesPage } from "./features/courses/pages/MyCreatedCoursesPage";
import { ExpertsDirectoryPage } from "./features/experts/pages/ExpertsDirectoryPage";
import { ExpertProfilePage } from "./features/experts/pages/ExpertProfilePage";
import { EditExpertProfilePage } from "./features/experts/pages/EditExpertProfilePage";
import { Header } from "./shared/components/Header";

export default function App() {
  const location = useLocation();

  // Páginas que no deben mostrar el Header
  const hideHeaderPaths = ["/login", "/register", "/auth/callback"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
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
        <Route
          path="/my-created-tutorials"
          element={
            <ExpertRoute>
              <MyCreatedTutorialsPage />
            </ExpertRoute>
          }
        />

        {/* Rutas de cursos */}
        <Route path="/courses" element={<CourseCatalogPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/create"
          element={
            <ExpertRoute>
              <CreateCoursePage />
            </ExpertRoute>
          }
        />
        <Route
          path="/courses/manage/:id"
          element={
            <ExpertRoute>
              <ManageCoursePage />
            </ExpertRoute>
          }
        />
        <Route
          path="/my-created-courses"
          element={
            <ExpertRoute>
              <MyCreatedCoursesPage />
            </ExpertRoute>
          }
        />

        {/* Rutas de expertos */}
        <Route path="/experts" element={<ExpertsDirectoryPage />} />
        <Route path="/experts/:id" element={<ExpertProfilePage />} />
        <Route
          path="/my-expert-profile"
          element={
            <ExpertRoute>
              <EditExpertProfilePage />
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

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import { createPost, type CreatePostData } from "../services/communityService";

export function CreatePostPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: CreatePostData) {
    try {
      setIsLoading(true);
      setError(null);
      const newPost = await createPost(data);
      navigate(`/community/${newPost.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear la publicación",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link
          to="/community"
          className="text-primary-600 hover:text-primary-700 mb-6 inline-flex items-center"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a la comunidad
        </Link>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Crear publicación
          </h1>
          <p className="mb-6 text-gray-600">
            Comparte tus experiencias, dudas o consejos con la comunidad
          </p>

          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { supabase, signInWithGoogle } from "../../../core/services/supabase";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Error al iniciar sesión");
    } else {
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    await signInWithGoogle();
    // Supabase redirigirá automáticamente
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <Alert color="failure" onDismiss={() => setError(null)}>
            <span className="font-medium">Error:</span> {error}
          </Alert>
        )}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            icon={HiMail}
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <TextInput
            id="password"
            name="password"
            type="password"
            icon={HiLockClosed}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-primary-600 hover:bg-primary-700 w-full"
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">o</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <Button
        color="light"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full"
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Continuar con Google
      </Button>

      {onSwitchToRegister && (
        <div className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary-600 hover:underline"
          >
            Regístrate aquí
          </button>
        </div>
      )}
    </div>
  );
}

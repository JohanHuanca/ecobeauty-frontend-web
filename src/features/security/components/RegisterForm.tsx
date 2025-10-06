import { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { HiMail, HiLockClosed, HiUser } from "react-icons/hi";
import { supabase } from "../../../core/services/supabase";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError("El nombre completo es requerido");
      return false;
    }

    if (!formData.email.trim()) {
      setError("El email es requerido");
      return false;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Error al registrar usuario");
    } else {
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <Alert color="failure" onDismiss={() => setError(null)}>
            <span className="font-medium">Error:</span> {error}
          </Alert>
        )}

        {success && (
          <Alert color="success">
            <span className="font-medium">¡Registro exitoso!</span> Ahora puedes
            iniciar sesión.
          </Alert>
        )}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="fullName">Nombre completo</Label>
          </div>
          <TextInput
            id="fullName"
            name="fullName"
            type="text"
            icon={HiUser}
            placeholder="Tu nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

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

        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          </div>
          <TextInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            icon={HiLockClosed}
            placeholder="••••••••"
            value={formData.confirmPassword}
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
          {loading ? "Registrando..." : "Registrarse"}
        </Button>
      </form>

      {onSwitchToLogin && (
        <div className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary-600 hover:underline"
          >
            Inicia sesión aquí
          </button>
        </div>
      )}
    </div>
  );
}

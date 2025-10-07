import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { HiMail, HiLockClosed, HiUser } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { supabase, signInWithGoogle } from "../../../core/services/supabase";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const navigate = useNavigate();
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

    try {
      // Primero intentamos registrar al usuario
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

      if (signUpError) {
        setError(signUpError.message || "Error al registrar usuario");
        setLoading(false);
        return;
      }

      // Si el usuario fue creado pero requiere confirmación de email
      if (signUpData.user && !signUpData.session) {
        // Intentar hacer login automáticamente (solo funciona si la confirmación está desactivada)
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

        if (signInError) {
          // Si falla el login, probablemente necesita confirmar email
          setError(
            "Registro exitoso. Por favor verifica tu email antes de continuar. " +
              "Si no ves el correo, revisa tu carpeta de spam.",
          );
          setLoading(false);
          return;
        }

        // Si el login fue exitoso
        if (signInData.session) {
          setSuccess(true);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          setTimeout(() => {
            navigate("/role-selection");
            if (onSuccess) {
              onSuccess();
            }
          }, 1500);
          setLoading(false);
          return;
        }
      }

      // Si se registró y ya tiene sesión (confirmación desactivada)
      if (signUpData.user && signUpData.session) {
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/role-selection");
          if (onSuccess) {
            onSuccess();
          }
        }, 1500);
      }
    } catch (err) {
      console.error("Error en registro:", err);
      setError("Ocurrió un error inesperado. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    await signInWithGoogle();
    // Supabase redirigirá automáticamente a /auth/callback
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <Alert
            className="bg-danger-50 border-danger-200"
            onDismiss={() => setError(null)}
          >
            <span className="text-danger-800 font-medium">Error:</span>{" "}
            <span className="text-danger-700">{error}</span>
          </Alert>
        )}

        {success && (
          <Alert className="bg-primary-50 border-primary-200">
            <span className="text-primary-800 font-medium">
              ¡Registro exitoso!
            </span>{" "}
            <span className="text-primary-700">
              Redirigiendo a selección de roles...
            </span>
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

      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">o</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <Button
        onClick={handleGoogleSignup}
        disabled={loading}
        className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Registrarse con Google
      </Button>

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

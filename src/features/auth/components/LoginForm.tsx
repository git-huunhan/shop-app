import { login } from "@/features/auth";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // if redirected here, location.state?.from?.pathname may exist
  const from = (location.state as any)?.from?.pathname || "/products";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u: any) => u.email === form.email && u.password === form.password
    );
    if (!found) {
      setError("Invalid credentials");
      return;
    }
    dispatch(login(found));
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full py-2 bg-rose-400 text-white rounded"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-3">
        Don't have an account?{" "}
        <a className="text-blue-600" href="/signup">
          Sign up
        </a>
      </p>
    </div>
  );
}

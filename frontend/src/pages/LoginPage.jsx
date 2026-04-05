import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import { authStorage } from "../auth/storage";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await apiClient.post("/api/auth/login/", formData);
      authStorage.setTokens(data.access, data.refresh);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="hero-copy">
        <p className="eyebrow">Student Management System</p>
        <h1>Run your student records like a pro.</h1>
        <p>
          Secure JWT authentication, fast student CRUD, and a clean dashboard in one place.
        </p>
      </section>

      <form className="glass-panel auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        {error && <p className="alert alert-error">{error}</p>}

        <label>
          Username
          <input name="username" value={formData.username} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="helper-text">
          No account yet? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;

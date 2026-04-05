import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiClient.post("/api/auth/signup/", formData);
      navigate("/login");
    } catch (err) {
      const msg =
        err.response?.data?.email?.[0] ||
        err.response?.data?.password?.[0] ||
        err.response?.data?.username?.[0] ||
        "Signup failed. Please check your details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="hero-copy">
        <p className="eyebrow">Create Account</p>
        <h1>Start managing students in minutes.</h1>
        <p>Register once, then access your secure dashboard anytime.</p>
      </section>

      <form className="glass-panel auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="alert alert-error">{error}</p>}

        <label>
          Username
          <input name="username" value={formData.username} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="helper-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default SignupPage;

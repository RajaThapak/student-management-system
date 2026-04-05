import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function DashboardPage() {
  const [stats, setStats] = useState({ total_students: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await apiClient.get("/api/dashboard/stats/");
        setStats(data);
      } catch {
        setError("Unable to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="page-shell">
      <Navbar />
      <section className="content-shell">
        <div className="page-head">
          <h1>Dashboard</h1>
          <p>Overview of your student data in real-time.</p>
        </div>

        {error && <p className="alert alert-error">{error}</p>}

        <section className="stats-grid">
          <StatCard
            label="Total Students"
            value={loading ? "..." : stats.total_students}
            tone="accent"
          />
          <StatCard label="System Status" value={loading ? "Checking" : "Healthy"} tone="success" />
          <StatCard label="Auth Type" value="JWT" tone="default" />
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;

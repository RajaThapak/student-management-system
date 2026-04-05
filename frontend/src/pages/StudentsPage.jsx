import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/client";
import Navbar from "../components/Navbar";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filters, setFilters] = useState({ search: "", course: "", year: "" });

  const fetchStudents = useCallback(async (activeFilters) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await apiClient.get("/api/students/", {
        params: {
          ...(activeFilters.search ? { search: activeFilters.search } : {}),
          ...(activeFilters.course ? { course: activeFilters.course } : {}),
          ...(activeFilters.year ? { year: activeFilters.year } : {}),
        },
      });
      setStudents(data);
    } catch {
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents(filters);
    // Run once on initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStudents]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async (event) => {
    event.preventDefault();
    await fetchStudents(filters);
  };

  const resetFilters = async () => {
    const reset = { search: "", course: "", year: "" };
    setFilters(reset);
    await fetchStudents(reset);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this student record?");
    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/api/students/${id}/`);
      setSuccess("Student deleted successfully.");
      await fetchStudents(filters);
    } catch {
      setError("Delete failed. Please try again.");
    }
  };

  return (
    <main className="page-shell">
      <Navbar />
      <section className="content-shell">
        <div className="page-head row-between">
          <div>
            <h1>Students</h1>
            <p>Manage records with search and filters.</p>
          </div>
          <Link className="btn" to="/students/new">
            + Add Student
          </Link>
        </div>

        <form className="glass-panel filters" onSubmit={applyFilters}>
          <input
            name="search"
            placeholder="Search by name, email or course"
            value={filters.search}
            onChange={handleFilterChange}
          />
          <input
            name="course"
            placeholder="Filter by course"
            value={filters.course}
            onChange={handleFilterChange}
          />
          <select name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
          <button type="submit" className="btn btn-small">
            Apply
          </button>
          <button type="button" className="btn btn-outline btn-small" onClick={resetFilters}>
            Reset
          </button>
        </form>

        {error && <p className="alert alert-error">{error}</p>}
        {success && <p className="alert alert-success">{success}</p>}

        <div className="glass-panel table-wrap">
          {loading ? (
            <p>Loading students...</p>
          ) : students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>{student.year}</td>
                    <td>{new Date(student.created_at).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <Link className="btn-link" to={`/students/${student.id}/edit`}>
                        Edit
                      </Link>
                      <button
                        className="btn-link danger"
                        type="button"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

export default StudentsPage;

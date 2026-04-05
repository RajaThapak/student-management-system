import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../api/client";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";

function StudentFormPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(studentId);

  const [loading, setLoading] = useState(false);
  const [loadingStudent, setLoadingStudent] = useState(isEdit);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
  });

  useEffect(() => {
    if (!isEdit) return;

    const fetchStudent = async () => {
      setLoadingStudent(true);
      try {
        const { data } = await apiClient.get(`/api/students/${studentId}/`);
        setDefaultValues({
          name: data.name,
          email: data.email,
          course: data.course,
          year: String(data.year),
        });
      } catch {
        setError("Unable to load student details.");
      } finally {
        setLoadingStudent(false);
      }
    };

    fetchStudent();
  }, [isEdit, studentId]);

  const handleSubmit = async (payload) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isEdit) {
        await apiClient.put(`/api/students/${studentId}/`, payload);
        setSuccess("Student updated successfully.");
      } else {
        await apiClient.post("/api/students/", payload);
        setSuccess("Student added successfully.");
      }

      setTimeout(() => navigate("/students"), 800);
    } catch (err) {
      const message =
        err.response?.data?.email?.[0] ||
        err.response?.data?.name?.[0] ||
        err.response?.data?.detail ||
        "Request failed. Please check the form and try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell">
      <Navbar />
      <section className="content-shell">
        <div className="page-head">
          <h1>{isEdit ? "Edit Student" : "Add Student"}</h1>
          <p>{isEdit ? "Update existing student record." : "Create a new student record."}</p>
        </div>

        {loadingStudent ? (
          <div className="glass-panel">
            <p>Loading student data...</p>
          </div>
        ) : (
          <StudentForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            submitLabel={isEdit ? "Update Student" : "Add Student"}
            loading={loading}
            serverError={error}
            successMessage={success}
          />
        )}
      </section>
    </main>
  );
}

export default StudentFormPage;

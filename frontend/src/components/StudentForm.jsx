import { useMemo, useState } from "react";

const initialState = {
  name: "",
  email: "",
  course: "",
  year: "",
};

function StudentForm({
  defaultValues,
  onSubmit,
  submitLabel,
  loading,
  serverError,
  successMessage,
}) {
  const [formData, setFormData] = useState(defaultValues || initialState);
  const [errors, setErrors] = useState({});

  const years = useMemo(() => [1, 2, 3, 4], []);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.course.trim()) newErrors.course = "Course is required.";
    if (!formData.year) newErrors.year = "Year is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    await onSubmit({
      ...formData,
      year: Number(formData.year),
    });
  };

  return (
    <form className="glass-panel form-grid" onSubmit={handleSubmit}>
      <h2>{submitLabel}</h2>

      {serverError && <p className="alert alert-error">{serverError}</p>}
      {successMessage && <p className="alert alert-success">{successMessage}</p>}

      <label>
        Full Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <label>
        Email
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="student@example.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>

      <label>
        Course
        <input
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Computer Science"
        />
        {errors.course && <span className="field-error">{errors.course}</span>}
      </label>

      <label>
        Year
        <select name="year" value={formData.year} onChange={handleChange}>
          <option value="">Select year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              Year {year}
            </option>
          ))}
        </select>
        {errors.year && <span className="field-error">{errors.year}</span>}
      </label>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default StudentForm;

import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  industry: "",
  netZeroBy: "",
  renewableEnergyPct: "",
  womenInLeadershipPct: "",
  ceoPayRatio: "",
  notes: "",
};

export default function AddCompany({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      setError("Company name is required.");
      return;
    }
    onAdd({ ...form, isUserAdded: true });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-company-modal" onClick={(e) => e.stopPropagation()}>

        <div className="detail-header">
          <div>
            <h3 className="detail-name">Add a Company to Compare</h3>
            <p className="detail-sub">Temporary session-only data</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="add-company-form">

          {error && <p className="error-text">{error}</p>}

          {[
            { label: "Company Name *", name: "name", placeholder: "e.g. Esri" },
            { label: "Industry", name: "industry", placeholder: "e.g. Technology" },
            { label: "Net Zero By", name: "netZeroBy", placeholder: "e.g. 2040" },
            { label: "Renewable Energy %", name: "renewableEnergyPct", placeholder: "e.g. ~90%" },
            { label: "Women in Leadership %", name: "womenInLeadershipPct", placeholder: "e.g. ~75%" },
            { label: "CEO Pay Ratio", name: "ceoPayRatio", placeholder: "e.g. 80:1" },
            { label: "Notes", name: "notes", placeholder: "Any extra context" },
          ].map((field) => (
            <div key={field.name} className="form-group">
              <label>{field.label}</label>
              <input
                name={field.name}
                value={form[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}

        </div>

        <div className="detail-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>Add &amp; Compare</button>
        </div>

      </div>
    </div>
  );
}

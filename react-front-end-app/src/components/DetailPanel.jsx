import { useState } from "react";
import "../styles/components/DetailPanel.css";
import { updateCompanyNotes } from "../api";

export default function DetailPanel({
  company,
  onClose,
  onCompare,
  isFavorited,
  onToggleFavorite,
  onDeleteCompany
}) {
  // local state for editable notes
  const [notes, setNotes] = useState(company.notes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveNotes = async () => {
    setSaving(true);
    try {
      await updateCompanyNotes(company.id, notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="detail-panel">

      <div className="detail-header">
        <div>
          <h2 className="detail-name">{company.name}</h2>
          <p className="detail-sub">{company.industry}</p>
        </div>
        <button className="btn-close" onClick={onClose}>Close</button>
      </div>

      <div className="detail-actions">
        <button
          className="btn-add-company"
          onClick={() => onCompare(company)}
        >
          + Add to Compare
        </button>

        <button
          className={`heart-btn ${isFavorited ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(company)}
        >
          {isFavorited ? "❤️" : "🤍"}
        </button>

        {/* oly show delete button for user-added companies */}
        {company.addedBy && (
          <button
            className="btn-danger"
            onClick={() => onDeleteCompany(company)}
          >
            Delete added company
          </button>
        )}
      </div>

      <ul className="detail-metrics">
        <li>🌎 Net Zero Goal Year <span>{company.netZeroBy}</span></li>
        <li>🌱 Renewable Energy <span>{company.renewableEnergyPct}</span></li>
        <li>👥 Women in Leadership <span>{company.womenInLeadershipPct}</span></li>
        <li>🏛 CEO Pay Ratio <span>{company.ceoPayRatio}</span></li>
      </ul>

      <p className="detail-description">
        <strong>Notes: </strong>{notes}
      </p>

      {/* editable notes section*/}
      <div className="edit-notes-box">
        <textarea
          className="edit-notes-input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Edit notes..."
          rows="4"
        />

        <button
          className="btn-primary"
          onClick={handleSaveNotes}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Notes"}
        </button>

        {saved && <p className="save-success">Notes updated!</p>}
      </div>

      <p className="detail-description">
        <strong>Source: </strong>{company.source}
      </p>

    </div>
  );
}

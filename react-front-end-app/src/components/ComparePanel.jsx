import "../styles/components/ComparePanel.css"

export default function ComparePanel({ companies, onRemove, onClear, onOpenAddModal }) {
  const [a, b] = companies;

  return (
    <div className="compare-panel">

      <div className="compare-header">
        <h3>Comparing Companies</h3>
        <button className="compare-clear-btn" onClick={onClear}>Clear All</button>
      </div>

      <div className="compare-columns">

        {a && (
          <div className="compare-card">
            <div className="compare-card-header">
              <h4>{a.name}</h4>
              <button className="compare-remove-btn" onClick={() => onRemove(a)}>✕</button>
            </div>

            <p><strong>Industry:</strong> {a.industry || "—"}</p>
            <p><strong>Net Zero Year:</strong> {a.netZeroBy || "—"}</p>
            <p><strong>Renewable Energy:</strong> {a.renewableEnergyPct || "—"}</p>
            <p><strong>Women in Leadership:</strong> {a.womenInLeadershipPct || "—"}</p>
            <p><strong>CEO Pay Ratio:</strong> {a.ceoPayRatio || "—"}</p>
            <p><strong>Notes:</strong> {a.notes || "—"}</p>
          </div>
        )}

        {b ? (
          <div className="compare-card">
            <div className="compare-card-header">
              <h4>{b.name}</h4>
              <button className="compare-remove-btn" onClick={() => onRemove(b)}>✕</button>
            </div>

            <p><strong>Industry:</strong> {b.industry || "—"}</p>
            <p><strong>Net Zero Year:</strong> {b.netZeroBy || "—"}</p>
            <p><strong>Renewable Energy:</strong> {b.renewableEnergyPct || "—"}</p>
            <p><strong>Women in Leadership:</strong> {b.womenInLeadershipPct || "—"}</p>
            <p><strong>CEO Pay Ratio:</strong> {b.ceoPayRatio || "—"}</p>
            <p><strong>Notes:</strong> {b.notes || "—"}</p>
          </div>
        ) : (
          <div className="compare-card compare-card-empty">
            <button className="compare-add-btn" onClick={onOpenAddModal}>
              + Add Company
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

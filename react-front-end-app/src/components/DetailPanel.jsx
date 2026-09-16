import "../styles/components/DetailPanel.css";


export default function DetailPanel({ company, onClose, onCompare }) {
  return (
    <div className="detail-panel">

      <div className="detail-header">
        <div>
          <h2 className="detail-name">{company.name}</h2>
          <p className="detail-sub">{company.industry}</p>
        </div>
        <button className="btn-close" onClick={onClose}>Close</button>
      </div>

      <button className="btn-add-company"
        style={{ marginBottom: "20px" }}
        onClick={() => onCompare(company)} >
        + Add to Compare
      </button>

      <ul className="detail-metrics">
        <li>🌎 Net Zero Goal Year <span>{company.netZeroBy}</span></li>  
        <li>🌱 Renewable Energy <span>{company.renewableEnergyPct}</span></li>
        <li>👥 Women in Leadership <span>{company.womenInLeadershipPct}</span></li>
        <li>🏛 CEO Pay Ratio <span>{company.ceoPayRatio}</span></li>
      </ul>

      <p className="detail-description"><strong>Notes: </strong>{company.notes}</p>

      <p className="detail-description">
        <strong>Source: </strong>{company.source}
      </p>

    </div>
  );
}
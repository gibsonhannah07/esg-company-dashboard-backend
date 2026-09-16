import "../styles/components/CompanyCard.css";

export default function CompanyCard({company,onSelect,isSelected,}) {
  return (
    <div
      className={`company-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(company)}
    >
      <div className="card-header">
        <div>
          <p className="card-name">{company.name}</p>
          {company.isUserAdded && (
            <span className="card-user-badge">You added</span>
          )}
        </div>
        <span className="card-industry">{company.industry}</span>
      </div>

      <div className="card-footer">
        <button
          className="card-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(company);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

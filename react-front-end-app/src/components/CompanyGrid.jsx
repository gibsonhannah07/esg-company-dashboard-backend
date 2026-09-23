import CompanyCard from "./CompanyCard";
import "../styles/components/CompanyGrid.css";

export default function CompanyGrid({
  companies,
  selectedCompany,
  onSelectCompany,
  searchQuery,
  favoritesMap,
  onToggleFavorite,
  onDeleteCompany,
}) {
  if (companies.length === 0 && searchQuery) {
    return (
      <p>No results found for "{searchQuery}", try searching another company name.</p>
    );
  }

  if (companies.length === 0) {
    return <p className="empty-state">No companies match your filter.</p>;
  }

  return (
    <div className="company-grid">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          onSelect={onSelectCompany}
          isSelected={selectedCompany?.id === company.id}
          isFavorited={!!favoritesMap?.[company.id]}
          onToggleFavorite={onToggleFavorite}
          onDeleteCompany={onDeleteCompany}   // safe for both pages
        />
      ))}
    </div>
  );
}

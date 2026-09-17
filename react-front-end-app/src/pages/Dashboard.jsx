import { useState, useEffect } from "react";
import "../styles/pages/Dashboard.css";
import CompanyGrid from "../components/CompanyGrid";
import FilterBar from "../components/FilterBar";
import DetailPanel from "../components/DetailPanel";
import ComparePanel from "../components/ComparePanel";
import AddCompany from "../components/AddCompany";
import {
  getAllCompanies,
  addCompany,
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
  CURRENT_USER_ID,
} from "../api";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [compared, setCompared] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Maps companyId to favoriteId, so we know which favorite row to delete later once we connect backend
  const [favoritesMap, setFavoritesMap] = useState({});

  useEffect(() => {
    loadCompanies();
    loadFavorites();
  }, []);

  async function loadCompanies() {
    try {
      setLoading(true);
      const data = await getAllCompanies();
      setCompanies(data);
    } catch (err) {
      setError("Could not load companies. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function loadFavorites() {
    try {
      const data = await getFavoritesByUser(CURRENT_USER_ID);
      const map = {};
      data.forEach((fav) => {
        map[fav.company.id] = fav.id;
      });
      setFavoritesMap(map);
    } catch (err) {
      console.error("Could not load favorites", err);
    }
  }

  async function handleToggleFavorite(company) {
    const existingFavoriteId = favoritesMap[company.id];

    if (existingFavoriteId) {
      try {
        await removeFavorite(existingFavoriteId);
        setFavoritesMap((prev) => {
          const updated = { ...prev };
          delete updated[company.id];
          return updated;
        });
      } catch (err) {
        console.error("Failed to remove favorite", err);
      }
    } else {
      try {
        const newFavorite = await addFavorite(CURRENT_USER_ID, company.id);
        if (newFavorite?.id) {
          setFavoritesMap((prev) => ({ ...prev, [company.id]: newFavorite.id }));
        }
      } catch (err) {
        console.error("Failed to add favorite", err);
      }
    }
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesIndustry =
      filterIndustry === "All" || company.industry === filterIndustry;

    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesIndustry && matchesSearch;
  });

  const industryOptions = [
    "All",
    ...new Set(companies.map((c) => c.industry)),
  ];

  function handleSelectCompany(company) {
    setSelectedCompany(company);
  }

  function handleCloseDetail() {
    setSelectedCompany(null);
  }

  function handleAddToCompare(company) {
    setCompared((prev) => {
      if (prev.length >= 2) return prev;
      if (prev.find((c) => c.id === company.id)) return prev;
      return [...prev, company];
    });
  }

  function handleRemoveFromCompare(company) {
    setCompared((prev) => prev.filter((c) => c.id !== company.id));
  }

  function handleClearCompare() {
    setCompared([]);
  }

  async function handleAddUserCompany(newCompanyForm) {
  try {
    const saved = await addCompany(newCompanyForm);
    setCompanies((prev) => [...prev, saved]);

    setCompared((prev) => {
      if (prev.length >= 2) return prev;
      return [...prev, saved];
    });

    setShowAddModal(false);
  } catch (err) {
    console.error("Failed to add company", err);
    throw err; // re-throw so AddCompany's catch block can show a message
  }
}

  function openAddCompanyModal() {
    setShowAddModal(true);
  }

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <section>
      <div className="dashboard-header">
        <h2>Company Dashboard</h2>
      </div>
      <div className="dashboard-about">
        <p>Using this dashboard, users can search companies, filter by industry
          to narrow down a search, and click a company’s card to view its ESG
          metrics and more information. Users can also utilize the “add and compare”
          feature to add their own data and compare side by side with a company
          in our database. </p>
      </div>
      <div className="search-bar">
        <label className="search-label">Search a Company: </label>
        <input
          type="text"
          placeholder="e.g. LaunchCode..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <FilterBar
        industries={industryOptions}
        selected={filterIndustry}
        onFilterChange={setFilterIndustry}
      />

      <div className="dashboard-actions">
        <button
          className="btn-add-company"
          onClick={() => setShowAddModal(true)}
        >
        + Add a company
        </button>
      </div>

      {compared.length > 0 && (
        <ComparePanel
          companies={compared}
          onRemove={handleRemoveFromCompare}
          onClear={handleClearCompare}
          onOpenAddModal={openAddCompanyModal}
        />
      )}

      <CompanyGrid
        companies={filteredCompanies}
        selectedCompany={selectedCompany}
        onSelectCompany={handleSelectCompany}
        onCompare={handleAddToCompare}
        comparedCompanies={compared}
        favoritesMap={favoritesMap}
        onToggleFavorite={handleToggleFavorite}
      />

      {selectedCompany && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <DetailPanel
              company={selectedCompany}
              onClose={handleCloseDetail}
              onCompare={handleAddToCompare}
              isFavorited={!!favoritesMap[selectedCompany.id]}
              onToggleFavorite={() => handleToggleFavorite(selectedCompany)}
            />
          </div>
        </div>
      )}

      {showAddModal && (
        <AddCompany
          onAdd={handleAddUserCompany}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </section>
  );
}
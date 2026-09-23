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
  getFavoritesBySession,
  addFavorite,
  removeFavorite,
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

  // Maps companyId → favoriteId
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
      const data = await getFavoritesBySession();
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
      // REMOVE FAVORITE
      try {
        await removeFavorite(existingFavoriteId);

        setFavoritesMap((prev) => {
          const updated = { ...prev };
          delete updated[company.id];
          return updated;
        });

        // ⭐ Refresh favorites list
        loadFavorites();

      } catch (err) {
        console.error("Failed to remove favorite", err);
      }
    } else {
      // ADD FAVORITE
      try {
        const newFavorite = await addFavorite(company.id);

        if (newFavorite?.id) {
          setFavoritesMap((prev) => ({
            ...prev,
            [company.id]: newFavorite.id,
          }));
        }

        // ⭐ Refresh favorites list
        loadFavorites();

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
      throw err;
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
        <p>
          Using this dashboard, users can search companies, filter by industry,
          and click a company’s card to view its ESG metrics. You can also add
          your own companies, compare any two side-by-side, and save favorites
          using the heart icon.
        </p>
      </div>

      <div className="search-bar">
        <label className="search-label">Search a Company: </label>
        <input
          type="text"
          placeholder="e.g. Verizon..."
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
        <button className="btn-add-company" onClick={openAddCompanyModal}>
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

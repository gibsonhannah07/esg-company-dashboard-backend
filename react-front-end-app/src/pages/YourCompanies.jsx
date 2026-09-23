import { useState, useEffect } from "react";
import "../styles/pages/Dashboard.css";
import CompanyGrid from "../components/CompanyGrid";
import DetailPanel from "../components/DetailPanel";
import ComparePanel from "../components/ComparePanel";
import AddCompany from "../components/AddCompany";

import { 
  getFavoritesBySession, 
  removeFavorite, 
  addCompany,
  deleteCompany,
  addFavorite 
} from "../api";

export default function YourCompanies() {
  const [favorites, setFavorites] = useState([]);
  const [myCompanies, setMyCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [compared, setCompared] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);

      const sessionName = localStorage.getItem("sessionName");

      const [favData, allCompanies] = await Promise.all([
        getFavoritesBySession(),
        fetch("http://localhost:8080/api/companies").then(res => res.json())
      ]);

      setFavorites(favData);

      const mine = allCompanies.filter(c => c.addedBy === sessionName);
      setMyCompanies(mine);

    } catch (err) {
      setError("Could not load your companies. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  // delete user added companies
  async function handleDeleteCompany(company) {
    try {
      await deleteCompany(company.id);

      setMyCompanies(prev => prev.filter(c => c.id !== company.id));
      setCompared(prev => prev.filter(c => c.id !== company.id));

      if (selectedCompany?.id === company.id) {
        setSelectedCompany(null);
      }

    } catch (err) {
      console.error("Failed to delete company", err);
    }
  }

  // favorite list
  const favoritedCompanies = favorites.map((fav) => fav.company);

  const favoritesMap = {};
  favorites.forEach((fav) => {
    favoritesMap[fav.company.id] = fav.id;
  });

  // favorite toggle
  async function handleToggleFavorite(company) {
    const favoriteId = favoritesMap[company.id];

    // add favorite
    if (!favoriteId) {
      try {
        const newFavorite = await addFavorite(company.id);
        setFavorites(prev => [...prev, newFavorite]);
      } catch (err) {
        console.error("Failed to add favorite", err);
      }
      return;
    }

    // remove favorite
    try {
      await removeFavorite(favoriteId);
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));

      if (selectedCompany?.id === company.id) {
        setSelectedCompany(null);
      }
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  }

  function handleSelectCompany(company) {
    setSelectedCompany(company);
  }

  function handleCloseDetail() {
    setSelectedCompany(null);
  }

  function handleAddToCompare(company) {
    setCompared(prev => {
      if (prev.length >= 2) return prev;
      if (prev.find(c => c.id === company.id)) return prev;
      return [...prev, company];
    });
  }

  function handleRemoveFromCompare(company) {
    setCompared(prev => prev.filter(c => c.id !== company.id));
  }

  function handleClearCompare() {
    setCompared([]);
  }

  async function handleAddUserCompany(newCompanyForm) {
    try {
      const saved = await addCompany(newCompanyForm);
      setMyCompanies(prev => [...prev, saved]);

      setCompared(prev => {
        if (prev.length >= 2) return prev;
        return [...prev, saved];
      });

      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add company", err);
      throw err;
    }
  }

  if (loading) return <p>Loading your companies...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <section>
      <div className="dashboard-header">
        <h2>Your Companies</h2>
      </div>

      <div className="dashboard-about">
        <p>
          See companies you've favorited and companies you've added yourself,
          all in one place. Compare any two side by side to learn more.
        </p>
      </div>

      <div className="dashboard-actions">
        <button className="btn-add-company" onClick={() => setShowAddModal(true)}>
          + Add a company
        </button>
      </div>

      {compared.length > 0 && (
        <ComparePanel
          companies={compared}
          onRemove={handleRemoveFromCompare}
          onClear={handleClearCompare}
          onOpenAddModal={() => setShowAddModal(true)}
        />
      )}

      <div className="your-companies-columns">
        <div className="your-companies-column">
          <h3>Favorites</h3>
          <CompanyGrid
            companies={favoritedCompanies}
            selectedCompany={selectedCompany}
            onSelectCompany={handleSelectCompany}
            favoritesMap={favoritesMap}
            onToggleFavorite={handleToggleFavorite}
            onDeleteCompany={null}   // Favorites cannot be deleted
          />
        </div>

        {/*  use-added companies only  */}
        <div className="your-companies-column">
          <h3>Companies You Added</h3>
          <CompanyGrid
            companies={myCompanies}
            selectedCompany={selectedCompany}
            onSelectCompany={handleSelectCompany}
            favoritesMap={favoritesMap}
            onToggleFavorite={handleToggleFavorite}
            onDeleteCompany={handleDeleteCompany}   // Delete allowed
          />
        </div>
      </div>

      {selectedCompany && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <DetailPanel
              company={selectedCompany}
              onClose={handleCloseDetail}
              onCompare={handleAddToCompare}
              isFavorited={!!favoritesMap[selectedCompany.id]}
              onToggleFavorite={() => handleToggleFavorite(selectedCompany)}
              onDeleteCompany={handleDeleteCompany}   // Delete inside modal pop up
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

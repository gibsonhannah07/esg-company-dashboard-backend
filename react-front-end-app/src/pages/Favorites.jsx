import { useState, useEffect } from "react";
import "../styles/pages/Dashboard.css"; // reusing existing dashboard styles for now, will likely change colors a bit
import CompanyGrid from "../components/CompanyGrid";
import DetailPanel from "../components/DetailPanel";

import {
  getFavoritesByUser,
  removeFavorite,
  CURRENT_USER_ID,
} from "../api";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]); // raw Favorite objects from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      setLoading(true);
      const data = await getFavoritesByUser(CURRENT_USER_ID);
      setFavorites(data);
    } catch (err) {
      setError("Could not load favorites.");
    } finally {
      setLoading(false);
    }
  }

  // CompanyGrid expects Company objects
  const favoritedCompanies = favorites.map((fav) => fav.company);

  // Map companyId -> favoriteId, same pattern as Dashboard, so CompanyGrid's favorite button can correctly show "favorited" and know what to remove
  const favoritesMap = {};
  favorites.forEach((fav) => {
    favoritesMap[fav.company.id] = fav.id;
  });

  async function handleToggleFavorite(company) {
    const favoriteId = favoritesMap[company.id];
    if (!favoriteId) return; // shouldn't happen on this page, but just in case

    try {
      await removeFavorite(favoriteId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
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

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p className="Error: favorites can't load at this time">{error}</p>;

  return (
    <section>
      <div className="dashboard-header">
        <h2>My Favorites</h2>
      </div>
      <div className="dashboard-about">
        <p>Companies you've saved for quick reference. Click a card to view
          full details, or unfavorite to remove it from this list.</p>
      </div>

      <CompanyGrid
        companies={favoritedCompanies}
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
              onCompare={() => {}} // no compare feature on this page ywt
              isFavorited={true}
              onToggleFavorite={() => handleToggleFavorite(selectedCompany)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
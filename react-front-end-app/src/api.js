const BASE_URL = "http://localhost:8080/api";

// Placeholder until login exists/if i add it/swap this for the real logged-in user's id later
export const CURRENT_USER_ID = 1;


export async function getAllCompanies() {
  const response = await fetch(`${BASE_URL}/companies`);
  if (!response.ok) throw new Error("Failed to fetch companies");
  return response.json();
}

export async function addCompany(companyData) {
  const response = await fetch(`${BASE_URL}/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...companyData, userId: CURRENT_USER_ID }),
  });
  if (!response.ok) throw new Error("Failed to add company");
  return response.json();
}


export async function getFavoritesByUser(userId) {
  const response = await fetch(`${BASE_URL}/favorites/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
}

export async function addFavorite(userId, companyId) {
  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, companyId }),
  });
  if (!response.ok && response.status !== 409) {
    throw new Error("Failed to add favorite");
  }
  return response.json();
}

export async function removeFavorite(favoriteId) {
  const response = await fetch(`${BASE_URL}/favorites/${favoriteId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove favorite");
}
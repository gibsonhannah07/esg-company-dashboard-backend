const BASE_URL = "http://localhost:8080/api";

// creates persistent sessionId if one doesn't exist
export function getSessionId() {
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("sessionId", id);
  }
  return id;
}

//set up this way until we add a login
// The user's "identity" is just a session name stored in localStorage
export function getSessionName() {
  let name = localStorage.getItem("sessionName");
  if (!name) {
    name = "User"; // fallback if no name is added
    localStorage.setItem("sessionName", name);
  }
  return name;
}


export async function getAllCompanies() {
  const response = await fetch(`${BASE_URL}/companies`);
  if (!response.ok) throw new Error("Failed to fetch companies");
  return response.json();
}

export async function addCompany(companyData) {
  const sessionName = getSessionName();

  const response = await fetch(`${BASE_URL}/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...companyData,
      addedBy: sessionName,   // replaces userId since we don't have a login yet
    }),
  });

  if (!response.ok) throw new Error("Failed to add company");
  return response.json();
}

//deletes a company added by a user
export async function deleteCompany(companyId) {
  const response = await fetch(`${BASE_URL}/companies/${companyId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete company");
}


//favorite by sessions

export async function getFavoritesBySession() {
  const sessionId = getSessionId();
  const response = await fetch(`${BASE_URL}/favorites/session/${sessionId}`);
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
}

export async function addFavorite(companyId) {
  const sessionId = getSessionId();
  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, companyId }),
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

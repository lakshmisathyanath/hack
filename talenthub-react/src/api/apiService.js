const API_URL = 'http://localhost:3001';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unexpected error occurred' }));
    throw new Error(error.message || `HTTP Error: ${response.status}`);
  }
  return response.json();
};

export const apiService = {
  // Talents
  getTalents: () => fetch(`${API_URL}/talents`).then(handleResponse),
  getTalentById: (id) => fetch(`${API_URL}/talents/${id}`).then(handleResponse),

  // Events (Marketplace)
  getEvents: () => fetch(`${API_URL}/events`).then(handleResponse),
  getEventById: (id) => fetch(`${API_URL}/events/${id}`).then(handleResponse),

  // My Managed Events (User View)
  getMyEvents: () => fetch(`${API_URL}/myEvents`).then(handleResponse),
  createMyEvent: (eventData) => fetch(`${API_URL}/myEvents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then(handleResponse),
  updateMyEvent: (id, eventData) => fetch(`${API_URL}/myEvents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).then(handleResponse),
  deleteMyEvent: (id) => fetch(`${API_URL}/myEvents/${id}`, {
    method: 'DELETE',
  }).then(handleResponse),

  // Applications
  getApplications: () => fetch(`${API_URL}/applications`).then(handleResponse),
  submitApplication: (appData) => fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appData),
  }).then(handleResponse),

  // Messaging
  getMessages: (talentId) => fetch(`${API_URL}/messages?talentId=${talentId}`).then(handleResponse),
  sendMessage: (msgData) => fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(msgData),
  }).then(handleResponse),

  // Bookings
  createBooking: (bookingData) => fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  }).then(handleResponse),

  // Users / Auth
  registerUser: (userData) => fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(handleResponse),

  // Requests (Direct Invitations)
  getRequests: () => fetch(`${API_URL}/requests`).then(handleResponse),
};

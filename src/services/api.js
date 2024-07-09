// src/services/api.js
import axios from 'axios';

const apiBaseUrl = 'http://localhost:5042' || process.env.VUE_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getAllContacts() {
    return apiClient.get('/api/agenda');
  },
  getContactById(id) {
    return apiClient.get(`/api/agenda/${id}`);
  },
  createContact(contact) {
    return apiClient.post('/api/agenda', contact);
  },
  updateContact(id, contact) {
    return apiClient.put(`/api/agenda/${id}`, contact)
  },
  inactivateContact(id, data) {
    return apiClient.put(`/api/agenda/inactivate/${id}`, data);
  },
  deleteContact(id) {
    return apiClient.delete(`/api/agenda/${id}`);
  }
};

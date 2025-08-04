import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerParticipant = (data) => api.post('/participants/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
});

export const getParticipants = () => api.get('/participants');

export const registerTeam = (data) => api.post('/teams/register', data);

export const getTeams = () => api.get('/teams');

export const registerCoach = (data) => api.post('/coaches/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
});

export const getCoaches = () => api.get('/coaches');

export const createEvent = (data) => api.post('/events', data);

export const getEvents = () => api.get('/events');

export const updateResult = (data) => api.post('/results', data);

export const getResults = () => api.get('/results');

export const getMedalTally = () => api.get('/results/medals');

export const loginAdmin = (data) => api.post('/auth/login', data);
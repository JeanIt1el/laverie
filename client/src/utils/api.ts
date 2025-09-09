// src/utils/api.ts
const API_BASE = 'http://localhost:8000';

export const apiUrls = (endpoint: string): string => {
  return `${API_BASE}/${endpoint}`;
};
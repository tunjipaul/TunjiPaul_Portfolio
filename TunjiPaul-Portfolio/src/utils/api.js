/**
 * API Utility for Authenticated Requests
 * 
 * This module provides a centralized way to make API requests with automatic
 * JWT token injection and error handling.
 */

import API_URL from '../config';

/**
 * Get the stored JWT token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Get token expiration timestamp
 */
export const getTokenExpiry = () => {
  const expiry = localStorage.getItem('tokenExpiry');
  return expiry ? parseInt(expiry, 10) : null;
};

/**
 * Check if the current token is expired
 */
export const isTokenExpired = () => {
  const expiry = getTokenExpiry();
  if (!expiry) return true;
  return Date.now() > expiry;
};

/**
 * Store authentication data in localStorage
 */
export const setAuthData = (token, expiresIn, email) => {
  const expiryTime = Date.now() + (expiresIn * 1000);
  localStorage.setItem('accessToken', token);
  localStorage.setItem('tokenExpiry', expiryTime.toString());
  localStorage.setItem('adminEmail', email);
  localStorage.setItem('isLoggedIn', 'true');
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('adminEmail');
  localStorage.removeItem('isLoggedIn');
};

/**
 * Logout user and redirect to login page
 */
export const logout = () => {
  clearAuthData();
  window.location.href = '/login';
};

/**
 * Make an authenticated API request
 * 
 * @param {string} endpoint - API endpoint (relative to API_URL)
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - Response data
 * 
 * @example
 * const data = await apiRequest('/api/skills', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'React', category: 'Frontend' })
 * });
 */
export const apiRequest = async (endpoint, options = {}) => {
  // Check if token is expired before making request
  if (isTokenExpired()) {
    console.warn('Token expired, logging out...');
    logout();
    throw new Error('Session expired. Please login again.');
  }

  const token = getToken();
  
  // Prepare headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Make the request
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized - token is invalid or expired
    if (response.status === 401) {
      console.warn('Unauthorized request, logging out...');
      logout();
      throw new Error('Authentication failed. Please login again.');
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Request failed with status ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    // Parse and return JSON response
    return await response.json();
  } catch (error) {
    // Re-throw the error for the caller to handle
    throw error;
  }
};

/**
 * Make an authenticated API request for file uploads
 * 
 * @param {string} endpoint - API endpoint (relative to API_URL)
 * @param {FormData} formData - Form data containing file and other fields
 * @returns {Promise<any>} - Response data
 */
export const apiUpload = async (endpoint, formData) => {
  // Check if token is expired before making request
  if (isTokenExpired()) {
    console.warn('Token expired, logging out...');
    logout();
    throw new Error('Session expired. Please login again.');
  }

  const token = getToken();
  
  // Prepare headers (don't set Content-Type for FormData, browser will set it with boundary)
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    // Handle 401 Unauthorized
    if (response.status === 401) {
      console.warn('Unauthorized request, logging out...');
      logout();
      throw new Error('Authentication failed. Please login again.');
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Upload failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default apiRequest;

// Base URL of your backend API (change when deploying to production)
export const BASE_URL = 'http://localhost:5000'

// API endpoints used in the project
export const API_PATHS = {
    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        GET_PROFILE: '/api/auth/profile',
    },

    RESUME: {
        CREATE: '/api/resume',
        GET_ALL: '/api/resume',
        GET_BY_ID: (id) => `/api/resume/${id}`,  // dynamic route
        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}`,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
    },

    IMAGES: {
        UPLOAD_IMAGE: '/api/auth/upload-image',
    }
}

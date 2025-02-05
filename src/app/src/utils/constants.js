import { constants } from "original-fs";

export const APP_NAME = 'Running App';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  RUN: '/run'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
  },
  RUNS: {
    START: '/runs/start',
    END: '/runs/end',
    LIST: '/runs',
    STATS: '/runs/stats'
  },
  USER: {
    PROFILE: '/users/profile',
    STATS: '/users/stats'
  }
};

export default constants;

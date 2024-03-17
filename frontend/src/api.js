// const AUTH = '/rest-auth'
const API = '/api';

const api = {
  login: API + '/token/',
  register: '/register/',
  preferences: '/preferences',
  reservations: '/reservations',
  removeBasket: '/reservations/remove-basket',
  slots: '/show-slots',
  reservationJobs: '/reservation-jobs',
  testToken: '/test'
};

export default api;

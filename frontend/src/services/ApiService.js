import api from '../api';
import StorageService from './StorageService';

/**
 * Service to abstract api calls to one file - to be used in middleware
 */
class ApiService {
  constructor() {
    // this.api_url = 'https://basketistanbul.herokuapp.com';
    this.api_url = 'http://localhost:8000';
  }

  /**
   * Service function to avoid repetition of fetch everywhere
   * @param {string} url - url to fetch
   * @param {string} method - method get or post
   * @param {string|boolean} token  - authentication token
   * @param {object|null} params - params payload
   * @param {string|null} queryParams - params query string
   */
  async apiCall(url, method = 'GET', token = false, params = null, queryParams = null) {
    let payload = {
      method,
      mode: 'cors',
      headers: this.buildHeaders(token)
    };
    if (params) {
      payload.body = JSON.stringify(params);
    }
    let finalUrl = ``;
    if (queryParams) {
      finalUrl = `${this.api_url}${url}/?${queryParams}`;
    } else {
      finalUrl = `${this.api_url}${url}`;
    }

    const res = await fetch(finalUrl, payload);
    const status = res.status;
    const body = await res.json();
    return { status, body };
  }

  /**
   * Build  http headers object
   * @param {string|boolean} token
   */
  buildHeaders(token = false) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Throw common error on not successful status
   * @param {object} response
   * @param {bool} auth - check for unauth error or not
   */
  handleCommonError(response, auth = false) {
    if (response.status === 401 && auth) {
      StorageService.removeToken();
      window.location(api.login);
    }
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.status);
    }
    return;
  }

  async login(params) {
    const res = await this.apiCall(api.login, 'POST', false, params);
    this.handleCommonError(res);
    return res.body;
  }

  async getPreferences() {
    const res = await this.apiCall(api.preferences, 'GET', StorageService.getToken('basket_token'));
    this.handleCommonError(res);
    return res.body;
  }

  async getReservations() {
    const res = await this.apiCall(
      api.reservations,
      'GET',
      StorageService.getToken('basket_token')
    );
    this.handleCommonError(res);
    return res.body;
  }

  async getReservationJobs() {
    const res = await this.apiCall(
      api.reservationJobs + '?status=COMPLETED',
      'GET',
      StorageService.getToken('basket_token')
    );
    this.handleCommonError(res);
    return res.body;
  }

  async cancelReservationJob(id) {
    const res = await this.apiCall(
      api.reservationJobs + '\\' + `${id}`,
      'PUT',
      StorageService.getToken('basket_token'),
      { status: 'CANCELLED' }
    );
    this.handleCommonError(res);
    return res.body;
  }

  async approveReservationJob(id) {
    const res = await this.apiCall(
      api.reservationJobs + '\\' + `${id}`,
      'PUT',
      StorageService.getToken('basket_token'),
      { status: 'PENDING' }
    );
    this.handleCommonError(res);
    return res.body;
  }

  async getSlots(courtSelection) {
    const res = await this.apiCall(
      api.slots,
      'GET',
      StorageService.getToken('basket_token'),
      null,
      `court_selection=${courtSelection}`
    );
    this.handleCommonError(res);
    return res.body;
  }

  async reserve(params) {
    const res = await this.apiCall(
      api.reservationJobs,
      'POST',
      StorageService.getToken('basket_token'),
      params
    );
    this.handleCommonError(res);
    return res.body;
  }

  async removeFromBasket(params) {
    const res = await this.apiCall(
      api.removeBasket,
      'POST',
      StorageService.getToken('basket_token'),
      params
    );
    this.handleCommonError(res);
    return res.body;
  }

  async register(params) {
    const res = await this.apiCall(api.register, 'POST', false, params);
    this.handleCommonError(res);
    const body = res.body;
    const status = res.status;
    return body, status;
  }

  async addPreference(params) {
    const res = await this.apiCall(
      api.preferences,
      'POST',
      StorageService.getToken('basket_token'),
      params
    );
    this.handleCommonError(res);
    return res.body;
  }

  async testToken() {
    const res = await this.apiCall(api.testToken, 'GET', StorageService.getToken('basket_token'));
    this.handleCommonError(res, true);
    return res.body;
  }
}

export default new ApiService();

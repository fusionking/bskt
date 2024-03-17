import { action, observable, runInAction } from 'mobx';
import ApiService from '../services/ApiService';
import StorageService from '../services/StorageService';

class AuthStore {
  @observable accessToken = '';
  @observable refreshToken = '';
  @observable isAuthenticated = false;
  @observable isLoading = true;
  @observable isFailure = false;
  @observable isLoggedOut = false;

  @action async login(params) {
    try {
      const res = await ApiService.login(params);
      StorageService.setToken(res.access);
      runInAction(() => {
        this.accessToken = res.access;
        this.refreshToken = res.refresh;
        this.isAuthenticated = true;
        this.isLoading = false;
        this.isFailure = false;
      });
    } catch (e) {
      runInAction(() => {
        this.isAuthenticated = false;
        this.isFailure = true;
        this.isLoading = false;
      });
    }
  }

  @action async logout() {
    try {
      StorageService.removeToken();
      runInAction(() => {
        this.accessToken = null;
        this.refreshToken = null;
        this.isAuthenticated = false;
        this.isLoading = false;
        this.isFailure = false;
        this.isLoggedOut = true;
      });
    } catch (e) {
      runInAction(() => {
        this.isAuthenticated = true;
        this.isFailure = true;
        this.isLoading = false;
        this.isLoggedOut = false;
      });
    }
  }
}

export const store = new AuthStore();

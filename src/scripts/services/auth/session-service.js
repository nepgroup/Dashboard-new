
class SessionService {

  /*@ngInject;*/
  constructor(localStorageService) {
    this.localStorage = localStorageService;
    this._user = this.localStorage.get('user');
    this._clouds = this.localStorage.get('clouds');
    this._signupReferrer = this.localStorage.get('signupReferrer');
  }

  getUser() {
    return this._user;
  }

  getClouds() {
    return this._clouds;
  }

  setUser(user) {
    this._user = user;
    this.localStorage.set('user', user);
  }

  setClouds(clouds) {
    this._clouds = clouds;
    this.localStorage.set('clouds', clouds);
  }

  setSignupReferrer(bool) {
    this.localStorage.set('signupReferrer', bool);
  }

  getSignupReferrer() {
    return this._signupReferrer;
  }

  isLogged() {
    return !_.isEmpty(this.getUser());
  }

  hasClouds() {
    return !_.isEmpty(this.getClouds());
  }

  isActivated() {
    return this.getUser().isActivated;
  }

  clear() {
    this.localStorage.clearAll();
    this._user = null;
    this._clouds = null;
  }

  removeCloud(cloud) {
    this.setClouds(_.reject(this._clouds, { _id: cloud._id}));
  }

  signout() {
    return this.clear();
  }

}

angular
  .module('myApp')
  .service('SessionService', SessionService);




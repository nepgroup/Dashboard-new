
class SettingsController {

  /*@ngInject;*/
  constructor ($scope, $state, ResourcesService, SessionService, ModalService, UploadService, STATE, CLOUDS, CONFIG) {
    this.scope = $scope;
    this.Session = SessionService;
    this.scope.user = SessionService.getUser();
    this.scope.clouds = () => SessionService.getClouds();
    this.scope.CLOUDS = CLOUDS;
    this.scope.actualStorage = () => this.actualStorage();
    this.scope.usedStorage = () => this.usedStorage();
    this.scope.maxStorage = () => this.maxStorage();
    this.scope.cloudStorage = (cloud) => this.cloudStorage(cloud);
    this.scope.hasCloud = (cloudType) => this.hasCloud(cloudType);
    this.scope.state = $state;
    this.scope.STATE = STATE;
    this.scope.Resources = ResourcesService;
    this.scope.titleActive = () => this.titleActive();
    this.scope.signout = () => this.signout();
    this.scope.showDetails = (cloud) => this.showDetails(cloud);
    this.ModalService = ModalService;
    this.CONFIG = CONFIG;
    this.scope.photoUploader = UploadService.photoUploader();
    this.scope.cloud = () => this.cloud();
    this.scope.legals = () => this.legals();
    this.scope.password = () => this.password();
    this.scope.image = () => this.image();
  }

  titleActive() {
    return this.scope.state.includes(this.scope.STATE.settings) || this.scope.state.includes(this.scope.STATE.add);
  }

  maxStorage() {
    return _(this.scope.clouds()).map((cloud) => Math.max(cloud.total, cloud.used)).sum();
  }

  usedStorage() {
    return _(this.scope.clouds()).map('used').sum();
  }

  actualStorage() {
    return this.usedStorage() * 100 / this.maxStorage();
  }

  cloudStorage(cloud) {
    return cloud.used * 100 / Math.max(cloud.used, cloud.total);
  }

  hasCloud(cloudType) {
    return _.some(this.scope.clouds(), {cloudType});
  }

  signout() {
    this.Session.signout();
  }

  showDetails(cloud) {
    this.ModalService.cloudDetails(cloud);
  }

  cloud() {
    this.scope.state.go(this.scope.STATE.clouds);
  }

  legals() {
    this.scope.state.go(this.scope.STATE.legals);
  }

  password() {
    this.ModalService.managePassword();
  }

  image() {
    return this.Session.getUser().image ?
    `${this.CONFIG.host}/photo/${this.Session.getUser().image}` :
    'images/userplaceholder.svg';
  }

}

angular
  .module('myApp')
  .controller('SettingsController', SettingsController);

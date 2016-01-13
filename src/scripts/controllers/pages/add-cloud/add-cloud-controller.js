/* eslint no-unused-vars: 0 */

class AddCloudController {

  constructor ($state, $scope, $stateParams, ApiService, SessionService, NotificationService, CLOUDS, STATE) {
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.CloudsApi = ApiService.clouds;
    this.SessionService = SessionService;
    this.scope.Clouds = CLOUDS;
    this.scope.addCloud = (cloud) => this.addCloud(cloud);
    this.scope.goSettings = () => this.goSettings();
    this.scope.goFiles = () => this.goFiles();
    this.fetchClouds();
    this.scope.clouds = () => SessionService.getClouds();
    this.scope.filterBy = (cloudType) => this.filterBy(cloudType);
    this.scope.capitalize = (word) => _.capitalize(word);

    this.error = $stateParams.errorCode ? `This ${$stateParams.cloud} account has already been linked to another Agora account.
              If this doesn't seem right, contact us immediately at
              <strong><a href="mailto:support@agora.co" target="_top">support@agora.co</a></strong>` : '';

    if (this.error) NotificationService.error(this.error);
  }

  addCloud(cloud) {
    return this.CloudsApi.connect(cloud);
  }

  fetchClouds() {
    return this.CloudsApi
      .getClouds()
      .then((clouds) => this.SessionService.setClouds(clouds));
  }

  goSettings() {
    this.state.go(this.STATE.clouds);
  }

  goFiles() {
    this.state.go(this.STATE.files);
  }

  filterBy(cloudType) {
    return _.filter(this.scope.clouds(), { cloudType });
  }

}


angular
  .module('myApp')
  .controller('AddCloudController', AddCloudController);

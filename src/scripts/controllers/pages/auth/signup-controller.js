/* global SignController */

class SignupController extends SignController {

  /*@ngInject;*/
  constructor ($scope, $state, $timeout, invite, ApiService, SessionService, ValidatorService, NotificationService, ModalService, STATE, CLOUDS) {
    super($scope, $state, ApiService, SessionService, ValidatorService, NotificationService, STATE, ModalService);
    this.signType = 'signup';
    this.scope.Clouds = CLOUDS;
    this.CloudsService = ApiService.clouds;
    this.timeout = $timeout;
    this.scope.isInvite = invite;
    this.scope.cloudText = (cloudType) => this.cloudText(cloudType);
    this.scope.hasClouds = (cloudType) => this.hasClouds(cloudType);
    this.scope.canContinue = () => this.canContinue();
    this.scope.addCloud = (cloud) => this.addCloud(cloud);
    this.scope.goToStep2 = () => this.goToStep2();
    this.scope.goFiles = () => this.goFiles();
    this.scope.collaborators = [];
    this.scope.Collaborators = () => this.scope.collaborators;
    this.scope.hasInvited = false;
    this.scope.invite = (collaborator) => this.invite(collaborator);
    this.scope.daysAgo = (date) => this.daysAgo(date);
    this.scope.picture = (url) => this.picture(url);
    this.scope.noCollaborators = () => this.noCollaborators();
    this.scope.fetchCollaborators = () => this.fetchCollaborators(3000);
    if (this.Session.isLogged()) this.fetchClouds();
    this.initializeInvite();
  }

  createUserForSign() {
    return {
      name: '',
      lastName: '',
      username: '',
      password: '',
      confirm: ''
    };
  }

  initializeScope(scope) {
    super.initializeScope(scope);
    this.scope.signup = (isValid) => {
      return this.doSign(isValid)
        .then(() => {
          this.fetchClouds();
          this.scope.steps = 1;
        })
        .catch((error) => this.NotificationService.error(error.data.error.message));
    };
  }

  fetchClouds() {
    return this.CloudsService
      .getClouds()
      .then((clouds) => this.Session.setClouds(clouds));
  }

  skip() {
    this.ModalService.skipConnect();
  }

  goToStep2() {
    this.Session.setSignupReferrer(false);
    this.scope.steps = 2;
    this.scope.loading = true;
    this.fetchCollaborators(3000);
  }

  goFiles() {
    this.state.go(this.STATE.files, { resourceId: '' });
  }

  addCloud(cloud) {
    this.Session.setSignupReferrer(true);
    return this.CloudsService.connect(cloud);
  }

  cloudText(cloudType) {
    const clouds = _.filter(this.Session.getClouds(), { cloudType });
    return clouds.length > 1 ?
      `${clouds.length} Accounts connected`
      : clouds.length === 1 ?
        clouds[0].cloudUserEmail
        : '';
  }

  hasClouds(cloudType) {
    return _.filter(this.Session.getClouds(), { cloudType }).length > 0;
  }

  canContinue() {
    return this.Session.getClouds().length > 0;
  }

  fetchCollaborators(milis) {
    this.scope.loading = true;
    this.timeout(() => {
      this.doFetchCollaborators();
    }, milis);
  }

  doFetchCollaborators() {
    this.CloudsService
      .getCloudCollaborators()
      .then((collaborators) => {
        this.scope.loading = false;
        this.scope.collaborators = collaborators;
      });
  }

  invite(collaborator) {
    this.scope.loading = true;
    this.scope.hasInvited = true;
    const data = {
      cloudUserEmail: collaborator.email,
      displayName: collaborator.displayName
    };
    this.CloudsService
      .invite([data])
      .then(() => {
        collaborator.invited = true;
        this.NotificationService.info(`${collaborator.displayName} invited!`);
        this.doFetchCollaborators();
      });
  }

  daysAgo(day) {
    const lastShared = new Date(day);
    const today = new Date();
    return Math.round((today - lastShared) / (1000 * 60 * 60 * 24));
  }

  picture(url) {
    return url || 'images/userplaceholder.svg';
  }

  noCollaborators() {
    return _.isEmpty(this.scope.collaborators);
  }

  initializeInvite() {
    this.scope.steps = this.scope.isInvite ? 2
      : this.Session.isLogged() ? 1 : 0;
  }

}

angular
  .module('myApp')
  .controller('SignupController', SignupController);

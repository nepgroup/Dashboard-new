/* global SignController */

class SigninController extends SignController {

  /*@ngInject;*/
  constructor ($scope, $state, ApiService, SessionService, ValidatorService, NotificationService, STATE) {
    super($scope, $state, ApiService, SessionService, ValidatorService, NotificationService, STATE);
    this.signType = 'signin';
  }

  initializeScope(scope) {
    super.initializeScope(scope);
    this.scope.signin = (isValid) => this.doSign(isValid)
      .then(() => {
        this.NotificationService.clear();
        this.state.go(this.STATE.files, { resourceId: '' });
      })
      .catch(() => this.NotificationService.error('Invalid e-mail or password.'));
  }

  createUserForSign() {
    return {
      username: '',
      password: ''
    };
  }

}

angular
  .module('myApp')
  .controller('SigninController', SigninController);

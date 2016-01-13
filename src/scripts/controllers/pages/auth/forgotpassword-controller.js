
class ForgotPasswordController {

  /*@ngInject;*/
  constructor ($scope, $state, ApiService, NotificationService, STATE) {
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.AuthApi = ApiService.auth;
    this.NotificationService = NotificationService;
    this.scope.forgot = (isValid) => this.forgot(isValid);
    this.scope.user = this.forgotPasswordEmail();
    this.scope.cancel = () => this.cancel();
  }

  forgotPasswordEmail() {
    return {
      username: ''
    };
  }

  forgot(isValid) {
    return !isValid ?
      Promise.resolve() :
      this.AuthApi.forgotPassword(this.scope.user.username)
      .then(() => this.NotificationService.info(`An email has been sent to ${this.scope.user.username} with a link to update your password`))
      .then(() => this.state.go(this.STATE.signin))
      .catch(() => this.NotificationService.error('Email was not found. Maybe you used a different one?'));
  }

  cancel() {
    this.state.go(this.STATE.signin);
  }

}

angular
  .module('myApp')
  .controller('ForgotPasswordController', ForgotPasswordController);

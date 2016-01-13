
class ActivationRequiredController {

  /*@ngInject;*/
  constructor ($scope, $state, email, token, ApiService, NotificationService, STATE) {
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.ApiService = ApiService.auth;
    this.NotificationService = NotificationService;
    this.scope.email = email;
    this.scope.showRequest = false;
    this.scope.activation = (user) => this.activation(user);
    this.scope.showInput = () => this.showInput();
    this.scope.message = token ? 'Invalid activation link.' : 'Looks like someone forgot to verify their email.';
  }

  activation(email) {
    return this.ApiService
      .activationRequest(email)
      .then(() => this.NotificationService.info(`An email has been sent to ${email} with a link to activate your account.`));
  }

  showInput() {
    this.scope.showRequest = true;
  }

}

angular
  .module('myApp')
  .controller('ActivationRequiredController', ActivationRequiredController);

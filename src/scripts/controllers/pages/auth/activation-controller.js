
class ActivationController {

  /*@ngInject;*/
  constructor ($scope, $state, email, token, ApiService, NotificationService, STATE) {

    this.scope = $scope;
    this.scope.isActivated = false;

    ApiService.auth
      .activate(token)
      .then(() => this.scope.isActivated = true)
      .catch(() => $state.go(STATE.activationrequired, { email: email, token: token}));

    this.state = $state;
    this.STATE = STATE;
    this.scope.goSignin = () => this.goSignin();
  }

  goSignin() {
    this.$state.go(this.STATE.signin);
  }

}

angular
  .module('myApp')
  .controller('ActivationController', ActivationController);

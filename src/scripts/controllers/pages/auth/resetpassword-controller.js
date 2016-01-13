
class ResetPasswordController {

  /*@ngInject;*/
  constructor ($scope, $state, STATE, token, ApiService, NotificationService, ValidatorService) {

    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.AuthService = ApiService.auth;
    this.token = token;
    this.scope.typePassword = {
      password: 'password',
      confirmPassword: 'password'
    };
    this.scope.close = () => this.close();
    this.scope.showPassword = (input) => this.showPassword(input);
    this.scope.password = this.createPassword();
    this.scope.reset = (isValid) => this.reset(isValid);
    this.scope.Validator = ValidatorService;
  }

  createPassword() {
    return {
      password: '',
      confirmPassword: '',
      token: this.token
    };
  }

  reset(isValid) {
    if (isValid) {
      this.AuthService
        .reset(this.scope.password)
        .then(() => this.NotificationService.info('Your password has been changed succesfully.'))
        .then(() => this.state.go(this.STATE.signin))
        .catch(() => this.NotificationService.error('Invalid Password.'));
    }
  }

  showPassword (input) {
    if (this.scope.typePassword[input] === 'password') {
      this.scope.typePassword[input] = 'text';
    } else{
      this.scope.typePassword[input] = 'password';
    }
  }

}

angular
  .module('myApp')
  .controller('ResetPasswordController', ResetPasswordController);


class PasswordModalController {

  /*@ngInject;*/
  constructor ($scope, $state, $fancyModal, ApiService, ResourcesService, NotificationService, STATE, ValidatorService, DebounceService) {
    this.AuthService = ApiService.auth;
    this.Resources = ResourcesService;
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.NotificationService = NotificationService;
    this.scope.fancyModal = $fancyModal;
    this.scope.typePassword = {
      old: 'password',
      new: 'password',
      confirm: 'password'
    };
    this.scope.close = () => this.close();
    this.scope.showPassword = (input) => this.showPassword(input);
    this.scope.password = this.createPassword();
    this.scope.changePassword = DebounceService.apply((isValid) => this.changePassword(isValid));
    this.scope.Validator = ValidatorService;
  }

  close() {
    this.scope.fancyModal.close();
  }

  createPassword() {
    return {
      old: '',
      new: '',
      confirm: ''
    };
  }

  changePassword(isValid) {
    if (isValid) {
      this.AuthService
        .changePassword(this.scope.password)
        .catch(() => this.NotificationService.error('Password must be at least 6 characters in length and contain a minimum of one number and one letter.'))
        .then(() => {
          this.NotificationService.info('Password succesfully changed.');
          this.close();
        });
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
  .controller('PasswordModalController', PasswordModalController);

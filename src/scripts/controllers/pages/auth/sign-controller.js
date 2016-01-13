/* eslint no-unused-vars: 0 */

class SignController {

  constructor ($scope, $state, ApiService, SessionService, ValidatorService, NotificationService, STATE, ModalService) {
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.AuthApi = ApiService.auth;
    this.Validator = ValidatorService;
    this.NotificationService = NotificationService;
    this.Session = SessionService;
    this.initializeScope();
    this.ModalService = ModalService;
    this.scope.skip = () => this.skip();
  }

  initializeScope(scope) {
    this.scope.user = this.createUserForSign();
  }

  doSign(isValid) {
    return !isValid ?
      Promise.resolve() :
      this.AuthApi[this.signType](this.scope.user)
        .then((fullUser) => {
          this.Session.setUser(fullUser);
          this.Session.setClouds(fullUser.clouds);
        });
  }

}

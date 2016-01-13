
class SkipModalController {

  /*@ngInject;*/
  constructor ($scope, $state, $fancyModal, SessionService, STATE) {
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.SessionService = SessionService;
    this.scope.fancyModal = $fancyModal;
    this.scope.close = () => this.close();
    this.scope.sure = () => this.sure();
  }

  close() {
    this.scope.fancyModal.close();
  }

  sure() {
    this.SessionService.setSignupReferrer(false);
    this.state.go(this.STATE.files);
    this.scope.fancyModal.close();
  }

}

angular
  .module('myApp')
  .controller('SkipModalController', SkipModalController);

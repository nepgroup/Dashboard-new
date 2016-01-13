
class SaveChangesController {

  /*@ngInject;*/
  constructor ($scope, $fancyModal, yes, no, modal) {
    this.modal = modal;
    this.fancyModal = $fancyModal;

    this.noCallback = no;
    this.yesCallback = yes;

    this.scope = $scope;
    this.scope.no = () => this.no();
    this.scope.yes = () => this.yes();
  }

  close() {
    this.fancyModal.close(this.modal.id);
  }

  no() {
    this.close();
    this.noCallback();
  }

  yes() {
    this.close();
    this.yesCallback();
  }

}

angular
  .module('myApp')
  .controller('SaveChangesController', SaveChangesController);

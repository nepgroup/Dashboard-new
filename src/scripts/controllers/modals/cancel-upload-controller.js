
class CancelUploadController {

  /*@ngInject;*/
  constructor ($scope, $fancyModal, uploader, modal) {
    this.modal = modal;
    this.scope = $scope;
    this.fancyModal = $fancyModal;
    this.scope.uploader = uploader;

    this.scope.close = () => this.close();
    this.scope.accept = () => this.accept();
  }

  close() {
    this.fancyModal.close(this.modal.id);
  }

  accept() {
    this.scope.uploader.cancelAll();
    this.scope.uploader.clearQueue();
    this.fancyModal.close();
  }

}

angular
  .module('myApp')
  .controller('CancelUploadController', CancelUploadController);

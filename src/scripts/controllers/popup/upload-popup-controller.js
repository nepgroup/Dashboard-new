
class UploadPopupController {

  /*@ngInject;*/
  constructor ($scope, $state, $window, $fancyModal, uploader, ModalService, TypeService, ResourceLocatorService, STATE) {
    this.STATE = STATE;
    this.scope = $scope;
    this.state = $state;
    this.fancyModal = $fancyModal;
    this.scope.uploader = uploader;
    this.ModalService = ModalService;
    this.ResourceLocatorService = ResourceLocatorService;

    this.scope.close = () => this.close();
    this.scope.share = () => this.share();
    this.scope.locate = (item) => this.locate(item);
    this.scope.remove = (item) => this.remove(item);
    this.scope.getMimeType = (mimeType) => TypeService.getType({ mimeType });

    $window.onbeforeunload = () =>
      this.scope.uploader.isUploading ? 'Agora uploads are in progress. If you leave this page, some uploads may not complete.' : null;
  }

  doClose() {
    this.fancyModal.close();
  }

  close() {
    if (this.scope.uploader.isUploading) {
      this.ModalService.cancelUpload(this.scope.uploader);
    } else {
      this.doClose();
    }
  }

  share() {

  }

  locate(item) {
    const resourceId = item.resource._id;
    if (!this.ResourceLocatorService.locate(item.resource._id)) {
      this.state.go(this.STATE.files, { resourceId: item.resource.parent, locate: resourceId }, { reload: true });
    }
  }

  remove(item) {
    item.cancel();
    item.remove();
    if (this.scope.uploader.queue.length < 1) {
      this.doClose();
    }
  }

}

angular
  .module('myApp')
  .controller('UploadPopupController', UploadPopupController);

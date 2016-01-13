/* global */

class ModalService {

  /*@ngInject;*/
  constructor($rootScope, $fancyModal, ApiService, BreadcrumbService) {
    this.fancyModal = $fancyModal;
    this.uploadFilesId = null;
    this.FilesService = ApiService.files;
    this.BreadcrumbService = BreadcrumbService;
    $rootScope.$on('$fancyModal.closed', (e, id) => {
      if (this.uploadFilesId === id) this.uploadFilesId = null;
    });
  }

  removeFile(resources) {
    this.fancyModal.open({
      templateUrl: `views/modals/alert-modal${resources.length <= 1 ? '' : '-multi'}.html`,
      showCloseButton: false,
      controller: 'AlertModalController',
      resolve: {
        resources: _.constant(resources)
      }
    });
  }

  renameFile(resource) {
    this.fancyModal.open({
      templateUrl: 'views/modals/rename-modal.html',
      showCloseButton: false,
      controller: 'RenameModalController',
      resolve: {
        resource: _.constant(resource)
      }
    });
  }

  cloudDetails(cloud) {
    this.fancyModal.open({
      templateUrl: 'views/modals/details-modal.html',
      showCloseButton: false,
      controller: 'DetailsModalController',
      resolve: {
        cloud: _.constant(cloud)
      }
    });
  }

  managePassword() {
    this.fancyModal.open({
      templateUrl: 'views/modals/password-modal.html',
      showCloseButton: false,
      controller: 'PasswordModalController'
    });
  }

  uploadFiles(uploader) {
    if (this.uploadFilesId === null) {
      const modal = this.fancyModal.open({
        templateUrl: 'views/popup/upload-popup.html',
        showCloseButton: false,
        closeOnEscape: false,
        closeOnOverlayClick: false,
        overlay: false,
        themeClass: 'popup',
        controller: 'UploadPopupController',
        resolve: {
          uploader: _.constant(uploader)
        }
      });
      this.uploadFilesId = modal.id;
    }
  }

  cancelUpload(uploader) {
    const modal = this.fancyModal.open({
      templateUrl: 'views/modals/cancel-upload-modal.html',
      showCloseButton: false,
      closeOnEscape: false,
      controller: 'CancelUploadController',
      themeClass: 'cancel',
      resolve: {
        modal: () => modal,
        uploader: () => uploader
      }
    });
  }

  saveChanges(callbacks) {
    const modal = this.fancyModal.open({
      templateUrl: 'views/modals/save-changes.html',
      showCloseButton: false,
      controller: 'SaveChangesController',
      themeClass: 'save',
      overlay: false,
      resolve: {
        modal: () => modal,
        yes: _.constant(callbacks.yes),
        no: _.constant(callbacks.no)
      }
    });
  }

  createFolder() {
    this.fancyModal.open({
      templateUrl: 'views/modals/create-folder-modal.html',
      showCloseButton: false,
      controller: 'CreateFolderModalController'
    });
  }

  move(resources) {
    this.fancyModal.open({
      templateUrl: 'views/modals/move-modal.html',
      showCloseButton: false,
      controller: 'MoveModalController',
      themeClass: 'move',
      resolve: {
        resources: () => resources,
        cloudRoot: () => _.head(this.BreadcrumbService.list)
      }
    });
  }

  skipConnect() {
    this.fancyModal.open({
      templateUrl: 'views/modals/skip-modal.html',
      showCloseButton: false,
      controller: 'SkipModalController'
    });
  }

}

angular
  .module('myApp')
  .service('ModalService', ModalService);




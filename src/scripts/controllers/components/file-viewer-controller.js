
class FileViewerController {

  /*@ngInject;*/
  constructor ($scope, $state, $window, $sce, resource, file, isEditMode, DownloadService, TypeService, ApiService, ModalService, STATE) {

    resource.url = file.viewLink;
    resource.mimeType = file.mimeType;

    this.resource = resource;
    this.scope = $scope;
    this.state = $state;
    this.window = $window;
    this.STATE = STATE;
    this.scope.resource = resource;
    this.scope.isEditMode = isEditMode === 'true' && TypeService.isOfficeDoc(resource);
    this.scope.resource.parents.push(resource);

    this.ModalService = ModalService;
    this.FilesService = ApiService.files;
    this.DownloadService = DownloadService;
    this.scope.TypeService = TypeService;

    this.scope.edit = () => this.edit();
    this.scope.close = () => this.close();
    this.scope.download = () => this.download();

    if (this.scope.isEditMode) this.edit();
  }

  close() {
    this.window.onbeforeunload = null;

    if (!this.scope.isEditMode) {
      this.doClose();
    } else {
      this.saveChanges();
    }
  }

  saveChanges() {
    this.FilesService
      .flush(this.resource._id)
      .then(() => this.doClose());
  }

  doClose() {
    this.FilesService
      .close(this.resource._id)
      .then(() => this.state.go(this.STATE.files, { resourceId: this.scope.resource.parent }));
  }

  download() {
    const resourcePromise = !this.scope.isEditMode ?
      this.FilesService.download([this.scope.resource]).get('data') :
      this.FilesService.downloadPreview(this.scope.resource);

    return resourcePromise.then((resource) => this.DownloadService.doSimpleDownload(resource.url));
  }

  edit() {
    this.scope.isEditMode = true;

    this.window.onbeforeunload = () => 'Wait!\n\nYou are currently in the middle of editing a file.\n' +
                                       'If you leave this page without hitting the close button, we cannot guarantee all changes will be saved.\n';

    return this.FilesService
      .edit(this.scope.resource)
      .then((file) => {
        this.scope.resource.mimeType = file.mimeType;
        this.scope.resource.url = file.viewLink;
      })
      .catch(() => {
        this.scope.resource.url = this.resource.url;
        this.scope.isEditMode = false;
      });
  }

}

angular
  .module('myApp')
  .controller('FileViewerController', FileViewerController);

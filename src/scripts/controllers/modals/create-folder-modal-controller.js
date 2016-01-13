
class CreateFolderModalController {

  /*@ngInject;*/
  constructor ($scope, $fancyModal, SessionService, ApiService, ResourcesService, NotificationService, BreadcrumbService, DebounceService) {
    this.FilesService = ApiService.files;
    this.scope = $scope;
    this.scope.fancyModal = $fancyModal;
    this.scope.close = () => this.close();
    this.scope.create = DebounceService.apply(() => this.create());
    this.SessionService = SessionService;
    this.ResourcesService = ResourcesService;
    this.NotificationService = NotificationService;
    this.FilesService = ApiService.files;
    this.scope.clouds = SessionService.getClouds();
    this.scope.selected = { cloud: this.scope.clouds[0] };
    this.scope.isFilesRoot = BreadcrumbService.isFilesRoot();
    this.BreadcrumbService = BreadcrumbService;
  }

  close() {
    this.scope.fancyModal.close();
  }

  create() {
    const parentId = this.scope.isFilesRoot ? this.scope.selected.cloud.root : this.BreadcrumbService.last()._id;
    return this.FilesService.create('folder', parentId, this.scope.newName)
      .then((resource) => {
        this.ResourcesService.unselectAll();
        resource.isSelected = true;
        this.ResourcesService.add(resource);
      })
      .catch(() => this.NotificationService.error('Add a Google Drive account to perform this action'))
      .finally(() => this.close());
  }

}

angular
  .module('myApp')
  .controller('CreateFolderModalController', CreateFolderModalController);

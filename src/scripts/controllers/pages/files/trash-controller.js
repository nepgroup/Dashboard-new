/* global ResourcesController*/

class TrashController extends ResourcesController {

  /*@ngInject;*/
  constructor ($scope, $state, resources, reverse, strategy, locate, ResourcesService, TypeService, ApiService, ModalService, UploadService, DownloadService, SorterService, ResourceLocatorService, BreadcrumbService, SessionService, STATE) {
    super($scope, $state, resources, reverse, strategy, locate, ResourcesService, TypeService, ApiService, ModalService, UploadService, DownloadService, SorterService, ResourceLocatorService, BreadcrumbService, SessionService, STATE);
    this.restore = () => this.resource();
  }

  open(resource){}

  restore() {
    return Promise.resolve(this.scope.Resources.selected())
      .map((resource) => this.FilesService.restore(resource))
      .then((resources) => this.scope.Resources.remove(resources));
  }

}

angular
  .module('myApp')
  .controller('TrashController', TrashController);

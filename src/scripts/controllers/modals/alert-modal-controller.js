
class AlertModalController {

  /*@ngInject;*/
  constructor ($scope, $fancyModal, resources, TypeService, ApiService, ResourcesService, DebounceService) {
    this.TypeService = TypeService;
    this.FilesService = ApiService.files;
    this.Resources = ResourcesService;
    this.scope = $scope;
    this.scope.fancyModal = $fancyModal;
    this.scope.close = () => this.close();
    this.scope.delete = DebounceService.apply(() => this.delete());
    this.scope.remove = () => this.remove();
    this.scope.resources = resources;
    this.scope.getMimeType = (file) => TypeService.getType(file);
    this.scope.message = () => this.message();
  }

  close() {
    this.scope.fancyModal.close();
  }

  delete() {
    Promise.resolve(this.scope.resources)
      .map((resource) => this.FilesService.delete(resource))
      .then((resources) => this.Resources.remove(resources))
      .then(() => this.close());
  }

  remove(index) {
    if (this.scope.resources.length > 1) {
      this.scope.resources.splice(index, 1);
    } else{
      this.close();
    }
  }

  message() {
    return this.scope.resources.length > 1 ?
      `Delete these ${this.scope.resources.length} items?` :
      'Delete this 1 item?';
  }

}

angular
  .module('myApp')
  .controller('AlertModalController', AlertModalController);

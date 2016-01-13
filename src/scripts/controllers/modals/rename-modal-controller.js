
class RenameModalController {

  /*@ngInject;*/
  constructor ($scope, $fancyModal, resource, ResourcesService, ApiService, TypeService, DebounceService) {
    this.scope = $scope;
    this.scope.fancyModal = $fancyModal;
    this.FilesService = ApiService.files;
    this.TypeService = TypeService;
    this.ResourcesService = ResourcesService;
    this.scope.close = () => this.close();
    this.scope.selectionOnFocus = (event) => this.selectionOnFocus(event);
    this.scope.rename = DebounceService.apply((newName) => this.rename(newName));
    this.scope.resource = resource[0];
    this.scope.newName = this.scope.resource.name;
    this.scope.getMimeType = (file) => TypeService.getType(file);
  }

  close() {
    this.scope.fancyModal.close();
  }

  rename(newName) {
    this.FilesService.rename(this.scope.resource, newName)
      .then((resource) => {
        resource.isSelected = true;
        this.ResourcesService.update([resource]);
      })
      .then(() => this.close());
  }

  selectionOnFocus(event) {
    const element = event.target;
    const index = element.value.lastIndexOf('.');
    if (this.TypeService.isFolder(this.scope.resource) || index === -1) {
      element.select();
    } else {
      element.setSelectionRange(0, index);
    }
  }

}

angular
  .module('myApp')
  .controller('RenameModalController', RenameModalController);

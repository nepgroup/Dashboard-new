
class MoveModalController {

  /*@ngInject;*/
  constructor ($scope, $fancyModal, resources, cloudRoot, TypeService, ApiService, ResourcesService, DebounceService) {
    this.scope = $scope;
    this.TypeService = TypeService;
    this.FilesService = ApiService.files;
    this.ResourcesService = ResourcesService;
    this.parents = [{ path: cloudRoot }];
    this.scope.fancyModal = $fancyModal;
    this.scope.close = () => this.close();
    this.scope.move = DebounceService.apply((destinationId) => this.move(destinationId));
    this.scope.copy = DebounceService.apply((destinationId) => this.copy(destinationId));
    this.scope.resources = resources;
    this.scope.getMimeType = (resource) => TypeService.getType(resource);
    this.scope.isFolder = (resource) => TypeService.isFolder(resource);
    this.scope.currentCloud = (resource) => resource.cloudType === this.scope.resources[0].cloudType;
    this.scope.destination = () => _.find(this.scope.Resources, { isSelected: true }) || _.last(this.parents).path;
    this.scope.open = DebounceService.apply((resource) => this.open(resource));
    this.scope.back = () => this.back();
    this.scope.canMove = () => this.canMove();
    this.scope.canCopy = () => this.canCopy();
    this.scope.hasParents = () => this.hasParents();
    this.scope.parent = () => _(this.parents).takeRight(2).first().path;
    this.scope.message = this.ResourcesService.filesAndFoldersText();
    this.scope.sharedMessage = _.filter(resources, { isShared: true }).length;
    this.listFolders(cloudRoot);
  }

  listFolders(cloudRoot) {
    this.FilesService.list(cloudRoot._id)
      .then((resources) => {
        this.scope.Resources = resources;
        this.parents = [{ path: cloudRoot, resources: this.scope.Resources }];
      });
  }


  close() {
    this.scope.fancyModal.close();
  }

  move(destination) {
    return Promise.resolve(this.scope.resources)
      .map((resource) => this.FilesService.move(resource._id, destination._id))
      .then(() => {
        this.ResourcesService.remove(this.scope.resources);
        this.close();
      });
  }

  copy(destination) {
    return Promise.resolve(this.scope.resources)
      .map((resource) => this.FilesService.copy(resource._id, destination._id))
      .then(() => {
        this.close();
      });
  }

  open(resource) {
    this.FilesService.list(resource._id)
      .then((resources) => {
        this.parents.push({ path: resource, resources: resources });
        this.scope.Resources = resources;
      });
  }

  back() {
   this.removeParent();
   this.scope.Resources = _.last(this.parents).resources;
   _.forEach(this.scope.Resources, (res) => { res.isSelected = false; });
  }

  hasParents() {
    return this.parents.length > 1;
  }

  removeParent() {
    if (this.parents.length > 1) {
      this.parents.pop();
    }
  }

  canMove() {
    return _.every(this.scope.resources, { isShared: false }) && !this.scope.destination().isShared;
  }

  canCopy() {
    return !_.any(this.scope.resources, (resource) => this.TypeService.isFolder(resource));
  }
}

angular
  .module('myApp')
  .controller('MoveModalController', MoveModalController);

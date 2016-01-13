
class ResourcesController {

  /*@ngInject;*/
  constructor ($scope, $state, resources, reverse, strategy, locate, ResourcesService, TypeService, ApiService, ModalService, UploadService, DownloadService, SorterService, ResourceLocatorService, BreadcrumbService, SessionService, STATE) {
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.Session = SessionService;
    this.scope.TypeService = TypeService;
    this.ModalService = ModalService;
    this.scope.Resources = ResourcesService;
    this.scope.Sorter = SorterService;
    this.FilesService = ApiService.files;
    this.DownloadService = DownloadService;
    this.scope.reverse = reverse;
    this.scope.strategy = strategy;
    this.scope.fileUploader = UploadService.fileUploader();

    ResourcesService.setResources(resources);
    ResourceLocatorService.locate(locate);

    this.scope.open = (resource) => this.open(resource);
    this.scope.removeFile = (resource) => this.removeFile(resource);
    this.scope.getMimeType = (resource) => TypeService.getType(resource);
    this.scope.renameFile = (resource) => this.renameFile(resource);
    this.scope.isTrash = () => $state.is(STATE.trash);
    this.scope.isFiles = () => $state.is(STATE.files);
    this.scope.isRecent = () => $state.is(STATE.recent);
    this.scope.isStarred = () => $state.is(STATE.starred);
    this.scope.isIncoming = () => $state.is(STATE.incoming);
    this.scope.isFilesRoot = () => BreadcrumbService.isFilesRoot();
    this.scope.canStar = () => this.canStar();
    this.scope.star = (resource) => this.star(resource);
    this.scope.unstar = (resource) => this.unstar(resource);
    this.scope.download = () => this.download();
    this.scope.goFiles = () => this.goFiles();
    this.scope.order = (field) => this.order(field);
    this.scope.orderClass = (field) => this.orderClass(field);
    this.scope.move = (resource) => this.move(resource);
    this.scope.edit = (resource) => this.edit(resource);
    this.scope.owner = (user) => this.owner(user);
    this.scope.isEditable = () => this.isEditable();
    this.scope.increasefilesCount = () => this.increasefilesCount();
  }

  selectedResources(resource) {
    return resource ? [resource] : this.scope.Resources.selected();
  }

  openFolder(resource) {
    this.state.go(this.STATE.files, { resourceId: resource._id });
  }

  openFile(resource) {
    this.state.go(this.STATE.views, { resourceId: resource._id });
  }

  open(resource) {
    if (this.scope.TypeService.isFolder(resource)) {
      this.openFolder(resource);
    } else {
      this.openFile(resource);
    }
  }

  removeFile(resource) {
    this.ModalService.removeFile(this.selectedResources(resource));
  }

  renameFile() {
    this.ModalService.renameFile(this.scope.Resources.selected());
  }

  canStar() {
    return _.some(this.scope.Resources.selected(), (resource) => !resource.isStarred);
  }

  star(resource) {
    return Promise.resolve(this.selectedResources(resource))
      .map((resource) => this.FilesService.star(resource))
      .then((resources) => this.scope.Resources.update(resources));
  }

  unstar(resource) {
    return Promise.resolve(this.selectedResources(resource))
      .map((resource) => this.FilesService.unstar(resource))
      .then((resources) => this.scope.Resources.update(resources));
  }

  download() {
    return this.DownloadService.download(this.scope.Resources.selected());
  }

  goFiles() {
    this.state.go(this.STATE.files);
  }

  order(field) {
    this.scope.reverse = this.scope.strategy === field && !this.scope.reverse;
    this.scope.strategy = field;
  }

  orderClass(field) {
    return {
      'flat-filtered-down': this.scope.reverse,
      'flat-filtered-up': !this.scope.reverse,
      'flat-non-filtered': this.scope.strategy !== field
    };
  }

  move(resource) {
    var resources = resource ? [resource] : this.scope.Resources.selected();
    this.ModalService.move(resources);
  }

  isEditable() {
    return this.scope.TypeService.isEditable(_.first(this.scope.Resources.selected()));
  }

  edit(resource) {
    const file = _.first(this.selectedResources(resource));
    this.state.go(this.STATE.views, { resourceId: file._id, edit: true });
  }

  increasefilesCount() {
    this.scope.filesCount += 20;
  }

  owner(resource) {
    const cloudType = resource.cloudType;
    const cloudUserId = resource.owner.cloudUserId;
    const displayName = resource.owner.displayName;
    return _.any(this.Session.getClouds(), { cloudUserId, cloudType }) ? 'me' : displayName;
  }

}

angular
  .module('myApp')
  .controller('ResourcesController', ResourcesController);

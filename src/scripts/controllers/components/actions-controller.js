
class ActionsController {

  /*@ngInject;*/
  constructor ($scope, $state, ResourcesService, TypeService, ModalService, DownloadService, ApiService, BreadcrumbService, DebounceService, STATE) {
    this.STATE = STATE;
    this.scope = $scope;
    this.state = $state;
    this.scope.Resources = ResourcesService;
    this.TypeService = TypeService;
    this.ModalService = ModalService;
    this.DownloadService = DownloadService;
    this.FilesService = ApiService.files;
    this.scope.isTrash = () => $state.is(STATE.trash);
    this.scope.isStarred = () => $state.is(STATE.starred);
    this.scope.isFilesRoot = () => BreadcrumbService.isFilesRoot();
    this.scope.isEditable = () => this.isEditable();
    this.scope.removeAllFiles = DebounceService.apply(() => this.removeAllFiles());
    this.scope.restoreAllFiles = DebounceService.apply(() => this.restoreAllFiles());
    this.scope.download = () => this.download();
    this.scope.move = DebounceService.apply(() => this.move());
    this.scope.edit = DebounceService.apply(() => this.edit());
    this.scope.isOfficeDoc = () => this.isOfficeDoc();
  }

  isEditable() {
    return this.TypeService.isEditable(_.first(this.scope.Resources.selected()));
  }

  removeAllFiles() {
    this.ModalService.removeFile(this.scope.Resources.selected());
  }

  restoreAllFiles() {
    return Promise.resolve(this.scope.Resources.selected())
      .map((resource) => this.FilesService.restore(resource))
      .then((resources) => this.scope.Resources.remove(resources));
  }

  download() {
    this.DownloadService.download(this.scope.Resources.selected());
  }

  move() {
    this.ModalService.move(this.scope.Resources.selected());
  }

  edit() {
    const resource = _.first(this.scope.Resources.selected());
    this.state.go(this.STATE.views, { resourceId: resource._id, edit: true });
  }

}

angular
  .module('myApp')
  .controller('ActionsController', ActionsController);


class AsideController {

  /*@ngInject;*/
  constructor ($scope, $state, SessionService, UploadService, FaviconService, ApiService, ModalService, BreadcrumbService, ResourcesService, NotificationService, DebounceService, STATE) {
    this.scope = $scope;
    this.scope.state = $state;
    this.scope.STATE = STATE;
    this.FaviconService = FaviconService;
    this.FilesService = ApiService.files;
    this.BreadcrumbService = BreadcrumbService;
    this.NotificationService = NotificationService;
    this.SessionService = SessionService;
    this.scope.Resources = ResourcesService;

    this.scope.isFiles = () => $state.is(STATE.files);
    this.scope.open = (cloud) => this.open(cloud);
    this.scope.files = () => this.files();
    this.scope.incoming = () => this.incoming();
    this.scope.recent = () => this.recent();
    this.scope.starred = () => this.starred();
    this.scope.trash = () => this.trash();
    this.scope.invite = () => this.invite();
    this.scope.incomingCounter = () => this.incomingCounter();
    this.scope.newDocument = () => this.newDocument();
    this.scope.newSpreadsheet = () => this.newSpreadsheet();
    this.scope.newPresentation = () => this.newPresentation();
    this.scope.createFolder = () => this.createFolder();
    this.ModalService = ModalService;
    this.scope.fileUploader = UploadService.fileUploader();

    this.scope.clouds = {
      list: SessionService.getClouds(),
      visible: $state.includes(STATE.files),
      click: () => this.cloudsClick(),
      class: () => this.cloudsClass()
    };

    this.scope.isEnabled = () => this.isEnabled();
    this.scope.$watch(() => SessionService.getClouds(), (clouds) => this.scope.clouds.list = clouds);
  }

  cloudsClick() {
    this.scope.clouds.visible = !this.scope.clouds.visible;
  }

  cloudsClass() {
    return this.scope.clouds.visible ?
      'flat-dropdowns-down' :
      'flat-dropdowns-up';
  }

  open(cloud) {
    this.scope.state.go(this.scope.STATE.files, { resourceId: cloud.root });
  }

  files() {
    this.scope.state.go(this.scope.STATE.files, { resourceId: '' });
  }

  incoming() {
    this.scope.state.go(this.scope.STATE.incoming);
  }

  starred() {
    this.scope.state.go(this.scope.STATE.starred);
  }

  recent() {
    this.scope.state.go(this.scope.STATE.recent);
  }

  trash() {
    this.scope.state.go(this.scope.STATE.trash);
  }

  invite() {
    this.scope.state.go(this.scope.STATE.signup, { invite: true });
  }

  incomingCounter() {
    return this.FaviconService.value;
  }

  new(mimeType) {
    return this.FilesService.create(mimeType, this.BreadcrumbService.last()._id)
      .then((resource) => {
        this.scope.Resources.add(resource);
        this.scope.state.go(this.scope.STATE.views, { resourceId: resource._id, edit: true });
      })
      .catch(() => this.NotificationService.error('Add a Google Drive account to perform this action'));
  }

  newDocument() {
    this.new('application/vnd.google-apps.document');
  }

  newSpreadsheet() {
    this.new('application/vnd.google-apps.spreadsheet');
  }

  newPresentation() {
    this.new('application/vnd.google-apps.presentation');
  }

  createFolder() {
    this.ModalService.createFolder();
  }

  isEnabled() {
    return this.scope.isFiles() && this.SessionService.hasClouds();
  }

}

angular
  .module('myApp')
  .controller('AsideController', AsideController);

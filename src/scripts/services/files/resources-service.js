
class ResourcesService {

  /*@ngInject;*/
  constructor(TypeService, ApiService, BreadcrumbService) {
    this.all = [];
    this.TypeService = TypeService;
    this.FilesService = ApiService.files;
    this.BreadcrumbService = BreadcrumbService;
  }

  setResources(resources) {
    this.all = resources;
  }

  add(resource) {
    if (this.BreadcrumbService.isRootOrFolder(resource.parent)) {
      this.all.push(resource);
    }
  }

  addAll(resources) {
    _.forEach(resources, (res) => this.add(res));
  }

  update(resources) {
    _.forEach(resources, (res) => _.merge(_.find(this.all, { _id: res._id }), res));
  }

  remove(resources) {
    _.forEach(resources, (res) => _.remove(this.all, {_id: res._id}));
  }

  clear() {
    this.all = [];
  }

  selected() {
    return _.filter(this.all, this.isSelected);
  }

  unselectAll() {
    _.forEach(this.all, (res) => { res.isSelected = false; });
  }

  selectAll() {
    _.forEach(this.all, (res) => { res.isSelected = true; });
  }

  anyoneSelected() {
    return _.some(this.all, this.isSelected);
  }

  canEdit(resource) {
    return !this.anyoneSelected() || this.isSelected(resource) && this.selected().length === 1;
  }

  isSingleOperation() {
    return this.selected().length === 1;
  }

  isSelected(resource) {
    return resource.isSelected;
  }

  moreThanOneSelected() {
    return this.selected().length > 1;
  }

  getMimeType(resource) {
    return this.TypeService.getType(resource);
  }

  foldersSelected() {
    return this.selected().filter((resource) => this.TypeService.isFolder(resource)).length;
  }

  filesSelected() {
    return this.selected().length - this.foldersSelected();
  }

  filesAndFoldersText() {
    const get = (n, sg, pl) => n > 1 ? `${n} ${pl}` : n === 1 ? `1 ${sg}` : '';
    const msg = {
      and: this.filesSelected() > 0 && this.foldersSelected() > 0 ? ' and ' : '',
      files: get(this.filesSelected(), 'file', 'files'),
      folders: get(this.foldersSelected(), 'folder', 'folders')
    };
    return `${msg.files}${msg.and}${msg.folders}`;
  }

  refresh() {
    this.FilesService.list().then((resources) => this.setResources(resources));
  }

}

angular
  .module('myApp')
  .service('ResourcesService', ResourcesService);





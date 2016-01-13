
class BreadcrumbService {

  /*@ngInject;*/
  constructor($state, ApiService, SessionService, STATE) {

    this.STATE = STATE;
    this.state = $state;
    this.FilesService = ApiService.files;
    this.Session = SessionService;
    this.list = [];

  }

  last() {
    return _.last(this.list);
  }

  isFolder(resourceId) {
    return _.isEqual(resourceId, this.last()._id);
  }

  isRoot(resourceId) {
    return this.isFilesRoot() && _.any(this.Session.getClouds(), { root: resourceId });
  }

  isFilesRoot() {
    return this.state.is(this.STATE.files, { resourceId: '' });
  }

  isRootOrFolder(resourceId) {
    return this.isFolder(resourceId) || this.isRoot(resourceId);
  }

  fetchParents(toState, params) {
    return _.isEmpty(params.resourceId) ?
      Promise
        .resolve([{ name: _.capitalize(_.last(toState.name.split('.'))) }])
        .then((list) => this.list = list) :
      this.FilesService
        .getMetadata(params.resourceId)
        .then((metadata) => {
          const parents = metadata.parents;
          delete metadata.parents;
          this.list = [ ...this.mapParents(parents), metadata ];
        });
  }

  mapParents(parents) {
    return _.map(parents, (parent) => {
        const cloudResource = parent.cloudResource;
        delete parent.cloudResource;
        return _.defaults(parent, cloudResource);
      });
  }

}

angular
  .module('myApp')
  .service('BreadcrumbService', BreadcrumbService);

/* eslint no-unused-vars: 0 */

class FilesService {

  constructor(Restangular, SessionService, RestangularFull) {
    this.Session = SessionService;
    this.Restangular = Restangular.one('api');
    this.RestangularFull = RestangularFull.one('api');
  }

  listRoot() {
    return Promise
      .resolve(this.Session.getClouds())
      .map((cloud) => this.list(cloud.root))
      .then((clouds) => _.flatten(clouds));
  }

  listFolder(resourceId) {
    return this.Restangular
      .one('resources', resourceId)
      .getList('children', { isDeleted: false });
  }

  list(resourceId) {
    return !_.isEmpty(resourceId) ?
      this.listFolder(resourceId) :
      this.listRoot();
  }

  listIncoming() {
    return this.Restangular
      .one('me')
      .getList('shared');
  }

  listStarred() {
    return this.Restangular
      .one('me')
      .getList('starred');
  }

  listRecent() {
    return this.Restangular
      .one('me')
      .getList('recent');
  }

  listTrash() {
    return this.Restangular
      .one('me')
      .getList('trash');
  }

  getMetadata(resourceId) {
    return this.Restangular
      .one('resources', resourceId)
      .get();
  }

  open(resourceId) {
    return this.Restangular
      .one('resources', resourceId)
      .post('open');
  }

  close(resourceId) {
    return this.Restangular
      .one('resources', resourceId)
      .post('close');
  }

  flush(resourceId) {
    return this.Restangular
      .one('resources', resourceId)
      .post('flush');
  }

  search(name) {
    return this.Restangular
      .one('resources')
      .getList('search', { name: name });
  }

  delete(resource) {
    return this.Restangular
      .one('resources', resource._id)
      .post('trash');
  }

  restore(resource) {
    return this.Restangular
      .one('resources', resource._id)
      .post('restore');
  }

  rename(resource, newName) {
    return this.Restangular
      .one('resources')
      .one(resource._id)
      .post('rename', { newName: newName });
  }

  star(resource) {
    return this.Restangular
      .one('me')
      .post('starred', { starredCloudResource: resource._id });
  }

  unstar(resource) {
    return this.Restangular
      .one('me')
      .one('starred', resource._id)
      .remove();
  }

  download(resources) {
    return this.RestangularFull
      .one('resources')
      .post('downloadurl', {
        ids: _.map(resources, '_id')
      });
  }

  downloadPreview(resource) {
    return this.Restangular
      .one('resources', resource._id)
      .post('downloadPreviewurl');
  }

  edit(resource) {
    return this.Restangular
      .one('resources', resource._id)
      .post('edit');
  }

  create(mimeType, parentId, name) {
    return this.Restangular
      .post('resources', {
        mimeType: mimeType,
        parent: parentId,
        name: name
      });
  }

  move(resourceId, toId) {
    return this.Restangular
      .one('resources', resourceId)
      .post('move', { to: toId });
  }

  copy(resourceId, toId) {
    return this.Restangular
      .one('resources', resourceId)
      .post('copy', { to: toId });
  }

}

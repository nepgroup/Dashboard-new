
class SorterService {

  /*@ngInject;*/
  constructor($filter, TypeService) {
    this.TypeService = TypeService;
  }

  notBy(bool, booleanExpression) {
    return bool ? booleanExpression : !booleanExpression;
  }

  folderFirst(reverse) {
    return (resource) => this.notBy(reverse, this.TypeService.isFolder(resource));
  }

  byName(reverse) {
    return [this.folderFirst(reverse), 'name'];
  }

  byCloud(reverse) {
    return [this.folderFirst(reverse), 'cloudType', 'name'];
  }

  byOwner(reverse) {
    return [this.folderFirst(reverse), 'owner.displayName', 'name'];
  }

  byModifiedDate(reverse) {
    return [this.folderFirst(reverse), 'modifiedDate', 'name'];
  }

  bySharedDate(reverse) {
    return ['sharedDate', 'name'];
  }

  noSort(reverse) {
    return [];
  }

}

angular
  .module('myApp')
  .service('SorterService', SorterService);





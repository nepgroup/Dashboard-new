
class SearchController {

  /*@ngInject;*/
  constructor ($scope, $state, ResourcesService, STATE) {
    this.scope = $scope;
    this.state = $state;
    this.STATE = STATE;
    this.scope.Resources = ResourcesService;
    this.scope.filesCount = 40;
    this.scope.search = (name) => this.search(name);
    this.scope.increasefilesCount = () => this.increasefilesCount();
  }

  canDoSearch (name) {
    return !_.isEmpty(name && name.trim());
  }

  search (name) {
    if(this.canDoSearch(name)) {
      return this.state.go(this.STATE.search, { name });
    }
  }

  increasefilesCount() {
    this.filesCount += 20;
  }

}

angular
  .module('myApp')
  .controller('SearchController', SearchController);
